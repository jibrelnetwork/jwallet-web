// @flow strict

import jibrelContractsApi from '@jibrelnetwork/contracts-jsapi'
import {
  toPairs,
  get,
  flatten,
  noop,
} from 'lodash-es'

import {
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
  type SyncerConfig,
} from './utils/initRemote'

type SyncerStartOptions = {
  currentBlock: number,
  onUpdate: Function,
}

// eslint-disable-next-line more/no-numeric-endings-for-variables
const NAME = 'Syncer'

class Syncer {
  onUpdate: Function
  withNetwork: Function
  network: Network
  currentBlock: number
  lastSyncedBlock: number
  address: string
  addressAssets: string[]
  isInit: boolean
  DB: Object // TODO: Actually, it's enhanced IndexedDB object via idb module
  assetsMap: { [Address]: DigitalAsset }

  isInit = false
  // eslint-disable-next-line fp/no-rest-parameters
  onUpdate = noop
  withNetwork = () => () => noop
  lastSyncedBlock = 0 // get from wallet
  address = null

  init = async (config: SyncerConfig) => {
    this.isInit = true
    this.network = config.network
    this.withNetwork = initRemote(config)

    this.assetsMap = (await getAssetsMainnet()).reduce((reduceResult, asset) => {
      const address = get(asset, 'blockchainParams.address', null)

      if (asset.blockchainParams.address) {
        reduceResult[address] = asset
      }

      return reduceResult
    }, {})
  }

  start = async (
    address: string,
    assets: string[],
    options: SyncerStartOptions = {
      currentBlock: -1,
      onUpdate: noop,
    },
  ): Promise<boolean> => {
    if (this.isInit == null || this.withNetwork == null) {
      throw new Error(`${NAME} was't initiated.
      Please, call init method with config before start syncing`)
    }

    this.address = address
    this.addressAssets = assets
    this.onUpdate = options.onUpdate
    this.DB = await init(address)
    this.currentBlock = await this.updateCurrentBlock(options.currentBlock)
    this.lastSyncedBlock = this.currentBlock

    return this.autoSync()
  }

  autoSync = async (): Promise<boolean> => {
    if (this.address == null) {
      throw new Error(`Please start ${NAME} with address.`)
    }

    const infinitySyncer = () => setTimeout(async () => {
      try {
        const currentBlock = await this.updateCurrentBlock(-1)
        const transfersETH = await this.fetchETH(currentBlock)
        const transfersContract =
          await this.addressAssets.reduce(async (acc, assetAddress) => {
            const transfers = await this.fetchDataFromContract(assetAddress, currentBlock)

            return [...(await acc), transfers]
          }, [])

        await this.addData(transfersETH)
        await this.addData(flatten(transfersContract))
      } catch (error) {
        console.log(error)
      } finally {
        this.onUpdate()
        infinitySyncer()
      }
    }, CONFIG.syncTransactionsTimeout)
    infinitySyncer()

    return true
  }

  fetchETH = async (currentBlockNumber: ?number = null): Promise<any> => {
    const transferETH = await blockExplorer.getETHTransactions(
      this.network.id,
      this.address,
      this.lastSyncedBlock,
      (currentBlockNumber || this.currentBlock),
    )

    return this.normalizeBlockchainTransactions(transferETH)
  }

  fetchDataFromContract = async (
    contractAddress: ?string = null,
    currentBlockNumber: ?number = null,
  ) => {
    const { address } = this

    /* eslint-disable fp/no-mutating-methods, fp/no-mutation */
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
            this.lastSyncedBlock,
            (currentBlockNumber || this.currentBlock),
          )
        const burnEvents =
          await this.withNetwork(WEB3.getBurnEvents)(
            contractAddress,
            address,
            this.lastSyncedBlock,
            (currentBlockNumber || this.currentBlock),
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
          this.lastSyncedBlock,
          (currentBlockNumber || this.currentBlock),
        )
      const transferEventsTo =
        await this.withNetwork(WEB3.getTransferEventsTo)(
          contractAddress,
          address,
          this.lastSyncedBlock,
          (currentBlockNumber || this.currentBlock),
        )

      historyItems.push(
        ...toPairs(transferEventsFrom),
        ...toPairs(transferEventsTo),
      )
    }

    this.lastSyncedBlock = this.currentBlock

    return historyItems.reduce((acc, transfer) => [...acc, {
      ...transfer[1],
      transactionID: transfer[0],
    }], [])
    /* eslint-enable fp/no-mutating-methods, fp/no-mutation */
  }

  stop = (): boolean => true
  config = (): boolean => true

  normalizeBlockchainTransactions = (transactions: Object[]): Object[] =>
    toPairs(transactions).reduce((acc, transfer) => [...acc, {
      ...transfer[1],
      transactionID: transfer[0],
      businessType: '',
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
    assets.reduce((reduceResult, asset) => {
      const address = get(asset, 'blockchainParams.address', null)

      if (asset.blockchainParams.address) {
        reduceResult[address] = asset
      }

      return reduceResult
    }, this.assetsMap)
  }
}

export default new Syncer()
