// @flow strict

import {
  toPairs,
} from 'lodash-es'

import jibrelContractsApi from '@jibrelnetwork/contracts-jsapi'

import web3 from 'services/web3'

import blockExplorer from 'services/blockExplorer'
import {
  init,
  addListToDB,
} from './db'

import {
  initRemote,
  type SyncerConfig,
} from './utils/initRemote'

class Syncer {
  network: Network
  withNetwork: Function
  lastSyncedBlock: number
  address: string
  isInit: boolean

  isInit = false
  // eslint-disable-next-line fp/no-rest-parameters
  withNetwork = Function
  lastSyncedBlock = 0 // get from wallet
  address = null

  init = (config: SyncerConfig) => {
    this.isInit = true
    this.network = config.network
    this.withNetwork = initRemote(config)
  }

  start = async (
    address: string,
    assets: string[],
  ): Promise<boolean> => {
    if (this.isInit == null || this.withNetwork == null) {
      throw new Error(`Syncer was't initiated.
      Please, call init method with config before start syncing`)
    }

    console.log(address, assets)

    this.address = address
    this.assets = assets
    this.DB = await init(address)

    const latestBlock = await this.sync()

    if (latestBlock > this.lastSyncedBlock) {
      this.lastSyncedBlock = latestBlock
    }

    return true
  }

  sync = async () => {
    if (this.address == null) {
      throw new Error('Please start Syncer with address.')
    }

    const contractAddress = this.assets[0]
    const { address } = this

    // Example using with simple method
    const latestBlock = await this.withNetwork(jibrelContractsApi.eth.getBlockNumber)()

    /* eslint-disable fp/no-let, fp/no-mutating-methods, fp/no-mutation */
    let historyItems = []

    const transferETH =
      await blockExplorer.getETHTransactions(
        this.network.id,
        address,
        this.lastSyncedBlock,
        latestBlock,
      )

    historyItems.push(...toPairs(transferETH))

    // Example using with extended props of method
    if (contractAddress) {
      const mintEvents =
        await this.withNetwork(web3.getMintEvents)(
          contractAddress,
          address,
          this.lastSyncedBlock,
          latestBlock,
        )
      const burnEvents =
        await this.withNetwork(web3.getBurnEvents)(
          contractAddress,
          address,
          this.lastSyncedBlock,
          latestBlock,
        )
      const transferEventsFrom =
        await this.withNetwork(web3.getTransferEventsFrom)(
          contractAddress,
          address,
          this.lastSyncedBlock,
          latestBlock,
        )
      const transferEventsTo =
        await this.withNetwork(web3.getTransferEventsTo)(
          contractAddress,
          address,
          this.lastSyncedBlock,
          latestBlock,
        )

      historyItems.push(
        ...toPairs(burnEvents),
        ...toPairs(mintEvents),
        ...toPairs(transferEventsFrom),
        ...toPairs(transferEventsTo),
      )
    }

    historyItems = historyItems.reduce((reduceResult, transfer) => {
      const item = {
        ...transfer[1],
        transactionID: transfer[0],
      }

      reduceResult.push(item)

      return reduceResult
    }, [])
    // eslint-enable no-let, fp/no-mutating-methods

    console.log(historyItems)
    /* eslint-enable fp/no-let, fp/no-mutating-methods, fp/no-mutation */

    if (historyItems.length > 0) {
      try {
        const dbTransaction = await this.DB.transaction('History', 'readwrite')
        addListToDB(dbTransaction)(historyItems)
      } catch (e) {
        console.log(e)
      }
    }

    // Example using with our web3 service
    // const assetBalance = await this.withNetwork(web3.getAssetBalance)(address, contractAddress)
    // console.log(assetBalance)
    console.log(latestBlock)

    return latestBlock
  }

  stop = (): boolean => true
  config = (): boolean => true
}

export default new Syncer()
