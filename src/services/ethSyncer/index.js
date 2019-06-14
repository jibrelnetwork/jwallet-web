// @flow strict

import jibrelContractsApi from '@jibrelnetwork/contracts-jsapi'

import web3 from 'services/web3'

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
  isInit: boolean

  isInit = false
  // eslint-disable-next-line fp/no-rest-parameters
  withNetwork = (f: Function, p: Object) => (...args: any[]) => () => { console.log(f, p, ...args) }

  init = (config: SyncerConfig) => {
    this.isInit = true
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

    const DB = await init(address)

    const contractAddress = assets[0]

    // Example using with simple method
    const latestBlock = await this.withNetwork(jibrelContractsApi.eth.getBlockNumber)()

    // Example using with extended props of method
    if (contractAddress) {
      const getTransferEvents = this.withNetwork(jibrelContractsApi.contracts.erc20.getPastEvents, {
        event: 'Transfer',
        contractAddress,
        options: {
          fromBlock: 0,
          toBlock: latestBlock,
          filter: {
            from: address,
          },
        },
      })

      const eventsTransfer = await getTransferEvents().map(event => ({
        ...event,
        transactionID: `${event.transactionHash}${event.logIndex}`,
      }))

      if (eventsTransfer.length > 0) {
        try {
          const dbTransaction = await DB.transaction('History', 'readwrite')
          addListToDB(dbTransaction)(eventsTransfer)
        } catch (e) {
          console.log(e)
        }
      }

      // Example using with our web3 service
      const assetBalance = await this.withNetwork(web3.getAssetBalance)(address, contractAddress)
      console.log(assetBalance)
    }

    return true
  }

  stop = (): boolean => true
  config = (): boolean => true
}

export default new Syncer()
