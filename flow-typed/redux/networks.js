// @flow

declare type NetworkId =
  '*' | // private
  '1' | // main
  '3' | // ropsten
  '4' | // rinkeby
  '42' // kovan

declare type NetworkName = 'mainnet' | 'ropsten' | 'rinkeby' | 'kovan'
declare type BlockExplorerAPISubdomain = NetworkName
declare type BlockExplorerUISubdomain = '' | 'ropsten' | 'rinkeby' | 'kovan'

declare type Network = {|
  +id: NetworkId,
  +title: string,
  +rpcaddr: string,
  +rpcport: number,
  +blockExplorerUISubdomain: BlockExplorerUISubdomain,
  +ssl: boolean,
  +isCustom: boolean,
|}

declare type Networks = {
  [NetworkId]: ?Network,
}

declare type NetworksPersist = {|
  +items: Networks,
  +currentNetworkId: NetworkId,
|}

declare type NetworksState = {|
  +persist: NetworksPersist,
|}
