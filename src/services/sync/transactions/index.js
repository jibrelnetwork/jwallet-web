// @flow strict

import jibrelContractsApi from '@jibrelnetwork/contracts-jsapi'
import {
  toPairs,
  get,
  noop,
} from 'lodash-es'

import {
  ethereum,
  getAssetsMainnet,
} from 'data/assets'
import CONFIG from 'config'
import WEB3 from 'services/web3'
import { checkETH } from 'utils/digitalAssets'
import blockExplorer from 'services/blockExplorer'

import {
  init,
  addListToDB,
} from './db'
import {
  initRemote,
} from './utils/initRemote'

/* eslint-disable fp/no-let, fp/no-mutation, no-return-assign */
function makeIterableAssetsList(list: Object[]) {
  let nextIndex = -1

  return {
    next: () =>
      nextIndex < list.length - 1
        ? {
          value: list[nextIndex += 1],
          done: false,
        }
        : { done: true },
  }
}
/* eslint-enable fp/no-let, fp/no-mutation, no-return-assign */

type SyncerInit = {
  network: Network,
  address: string,
  assets: string[],
  currentBlock: number,
  onUpdate: Function,
}

// eslint-disable-next-line more/no-numeric-endings-for-variables
const NAME = 'Syncer'

class Syncer {
  onUpdate: Function
  withNetwork: Function
  network: Network
  activeSyncer: ?Function
  currentBlock: number
  lastSyncedBlock: number
  address: string
  addressAssets: string[]
  isInit: boolean
  isSyncing: boolean
  DB: Object // TODO: Actually, it's enhanced IndexedDB object via idb module
  assetsMap: { [Address]: DigitalAsset }

  isInit = false
  isSyncing = false
  onUpdate = noop
  // eslint-disable-next-line fp/no-rest-parameters, no-unused-vars
  withNetwork = (web3Method: any, mergedProps: any) => (...args: mixed[]) => noop
  activeSyncer = null

  init = async (config: SyncerInit) => {
    if (this.isInit) {
      this.stop()
    }

    this.withNetwork = initRemote(config.network)
    this.network = config.network
    this.address = config.address
    this.addressAssets = config.assets.filter(asset => asset !== ethereum.blockchainParams.address)
    this.onUpdate = config.onUpdate
    this.DB = await init(config.address)
    this.currentBlock = await this.updateCurrentBlock(config.currentBlock)
    this.lastSyncedBlock = 0

    this.assetsMap = (await getAssetsMainnet()).reduce((reduceResult, asset) => {
      const assetAddress = get(asset, 'blockchainParams.address', null)

      if (assetAddress) {
        reduceResult[assetAddress] = asset
      }

      return reduceResult
    }, {})

    this.isInit = true
  }

  start = () => {
    if (this.isInit == null) {
      throw new Error(`${NAME} was't initiated.
      Please, call init method with config before start syncing`)
    }

    this.activeSyncer = this.createInfinitySyncer(this.syncer)
    this.autoSync()
  }

  createInfinitySyncer = (f: Function) =>
    (blockNumber: number) =>
      setTimeout(
        () => f(blockNumber),
        CONFIG.syncTransactionsTimeout,
      )

  syncer = async (latestSyncedBlock: ?number = null) => {
    if (!this.activeSyncer) {
      throw new Error(`Active syncer is not defined. Please start ${NAME} with.`)
    }

    const lastBlock =  latestSyncedBlock || this.lastSyncedBlock

    try {
      const currentBlock = await this.updateCurrentBlock(-1)

      const transfersETH = await this.fetchETH({
        from: lastBlock,
        to: currentBlock,
      })

      const assetsList = makeIterableAssetsList(this.addressAssets)
      // eslint-disable-next-line fp/no-let
      let result = assetsList.next()

      while (!result.done) {
        // eslint-disable-next-line no-await-in-loop
        const data = await this.fetchDataFromContract(result.value, {
          from: lastBlock,
          to: currentBlock,
        })
        // eslint-disable-next-line no-await-in-loop
        await this.addData(data)
        // eslint-disable-next-line fp/no-mutation
        result = assetsList.next()
      }

      this.onUpdate({
        latestSyncedBLock: lastBlock,
        currentBlock,
        history: [...transfersETH],
      })

      await this.addData(transfersETH)

      this.lastSyncedBlock = this.currentBlock
    } catch (error) {
      this.lastSyncedBlock = lastBlock
      console.log(error)
    }

    this.activeSyncer(this.lastSyncedBlock)
  }

  autoSync = () => {
    if (!this.activeSyncer) {
      throw new Error(`Active syncer is not defined. Please start ${NAME} with.`)
    }

    this.activeSyncer(this.lastSyncedBlock)
    this.isSyncing = true
  }

  fetchETH = async (blocks: { from: ?number, to: ?number }): Promise<any> => {
    const transferETH = await blockExplorer.getETHTransactions(
      this.network.id,
      this.address,
      (blocks.from || this.lastSyncedBlock),
      (blocks.to || this.currentBlock),
    )

    return this.normalizeBlockchainTransactions(transferETH)
  }

  fetchDataFromContract = async (
    contractAddress: ?string = null,
    blocks: { from: ?number, to: ?number },
  ) => {
    const { address } = this

    /* eslint-disable fp/no-mutating-methods, fp/no-mutation, no-await-in-loop */
    const historyItems = []

    if (contractAddress && !checkETH(contractAddress)) {
      if (
        get(
          this.assetsMap[contractAddress],
          'blockchainParams.symbol',
          null,
        ) === 'JNT'
      ) {
        const mintEvents =
          await this.withNetwork(WEB3.getMintEvents)(
            contractAddress,
            address,
            (blocks.from || this.lastSyncedBlock),
            (blocks.to || this.currentBlock),
          )
        const burnEvents =
          await this.withNetwork(WEB3.getBurnEvents)(
            contractAddress,
            address,
            (blocks.from || this.lastSyncedBlock),
            (blocks.to || this.currentBlock),
          )

        historyItems.push(
          ...toPairs(burnEvents),
          ...toPairs(mintEvents),
        )
      }

      const transferEventsFrom =
        await this.withNetwork(WEB3.getTransferEventsFrom)(
          contractAddress,
          address,
          (blocks.from || this.lastSyncedBlock),
          (blocks.to || this.currentBlock),
        )
      const transferEventsTo =
        await this.withNetwork(WEB3.getTransferEventsTo)(
          contractAddress,
          address,
          (blocks.from || this.lastSyncedBlock),
          (blocks.to || this.currentBlock),
        )

      historyItems.push(
        ...toPairs(transferEventsFrom),
        ...toPairs(transferEventsTo),
      )
    }

    const items = makeIterableAssetsList(historyItems)
    // eslint-disable-next-line fp/no-let
    let iterableItem = items.next()
    const result = []

    while (!iterableItem.done) {
      const transfer = iterableItem.value
      const transferRecord = transfer[1]
      const blockData = await WEB3.getBlockData(this.network, transferRecord.blockNumber)
      const receiptData =
        await this.withNetwork(WEB3.getTransactionReceiptData)(transferRecord.hash)

      // eslint-disable-next-line prefer-destructuring
      transferRecord.id = transfer[0]
      transferRecord.blockData = blockData
      transferRecord.receiptData = receiptData
      transferRecord.assetAddress = contractAddress

      result.push(transferRecord)
      iterableItem = items.next()
    }

    return result
    /* eslint-enable fp/no-mutating-methods, fp/no-mutation, no-await-in-loop */
  }

  stop = (): boolean => true
  config = (): boolean => true

  normalizeBlockchainTransactions = (transactions: Object[]): Object[] =>
    toPairs(transactions).reduce((acc, transfer) => [...acc, {
      ...transfer[1],
      id: transfer[0],
      assetAddress: ethereum.blockchainParams.address,
    }], [])

  updateCurrentBlock = async (currentBlock: number = -1) => {
    try {
      this.currentBlock = currentBlock === -1
        ? await this.withNetwork(jibrelContractsApi.eth.getBlockNumber)()
        : currentBlock
    } catch (error) {
      throw new Error(`${NAME} can't set current block for ${String(this.address)}.
      Error: ${error}`)
    }

    return this.currentBlock
  }

  addData = async (historyItems: Transaction[] = []) => {
    if (historyItems.length > 0) {
      try {
        const dbTransaction = await this.DB.transaction('History', 'readwrite')
        addListToDB(dbTransaction)(historyItems)
      } catch (e) {
        console.log(e)
      }
    }
  }

  updateAssetsMap = (assets: DigitalAsset[]) => {
    this.assetsMap = assets.reduce((reduceResult, asset: DigitalAsset) => {
      const { address } = asset.blockchainParams

      if (asset.blockchainParams.address) {
        reduceResult[address] = asset
      }

      return reduceResult
    }, this.assetsMap)
  }
}

export default new Syncer()
