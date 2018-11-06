// @flow

/**
 * Networks
 */
declare type NetworkId = string
declare type NetworkTitleById = { [NetworkId]: string }

declare type Network = {
  +id: NetworkId,
  +title: string,
  +rpcaddr: string,
  +rpcport: string,
  +ssl: boolean,
  +isCustom: boolean,
}

declare type Networks = Array<Network>

declare type NetworksData = {
  +items: Networks,
  +invalidFields: FormFields,
  +customNetworkRPC: string,
  +isLoading: boolean,
  +isInitialised: boolean,
  +currentNetwork: ?NetworkId,
}
