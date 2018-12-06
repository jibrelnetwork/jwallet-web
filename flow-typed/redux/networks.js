// @flow

declare type NetworkId =
  '*' | // private
  '1' | // main
  '3' | // ropsten
  '4' | // rinkeby
  '42' // kovan

declare type BlockExplorerAPISubdomain =
  'api' |
  'ropsten' |
  'rinkeby' |
  'kovan'

declare type Network = {|
  +title: string,
  +rpcaddr: string,
  +rpcport: number,
  +blockExplorerSubdomain: BlockExplorerAPISubdomain,
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
