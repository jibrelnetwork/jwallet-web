// @flow

declare type NetworkId = string

declare type Network = {|
  +title: string,
  +rpcaddr: string,
  +rpcport: number,
  +blockExplorerSubdomain: string,
  +ssl: boolean,
  +isCustom: boolean,
|}

declare type Networks = {
  [NetworkId]: ?Network,
}

/* eslint-disable-next-line no-unused-vars */
type RPCProps = {|
  +rpcaddr: string,
  +rpcport: number,
  +ssl: boolean,
|}

declare type NetworksPersist = {|
  +items: Networks,
  +currentNetworkId: NetworkId,
|}

declare type NetworksState = {|
  +persist: NetworksPersist,
|}
