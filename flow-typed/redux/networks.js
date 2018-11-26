// @flow

declare type NetworkId = string
declare type NetworkIdOptional = ?string
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

/* eslint-disable-next-line no-unused-vars */
type RPCProps = {|
  +rpcaddr: string,
  +rpcport: number,
  +ssl: boolean,
|}

declare type NetworksData = {
  +items: Networks,
  +invalidFields: FormFields,
  +customNetworkRPC: string,
  +isLoading: boolean,
  +isInitialised: boolean,
  +currentNetwork: ?NetworkId,
}
