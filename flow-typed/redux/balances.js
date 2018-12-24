// @flow

declare type Balance = {|
  +value?: string,
  +isError?: boolean,
|}

declare type Balances = {
  [AssetAddress]: ?Balance,
}

declare type BalancesByOwner = {
  [BlockNumber]: ?Balances,
}

declare type BalancesByNetworkId = {
  [OwnerAddress]: ?BalancesByOwner,
}

declare type BalancesItems = {
  [NetworkId]: ?BalancesByNetworkId,
}

declare type BalancesPersist = {|
  +items: BalancesItems,
|}

declare type BalancesState = {|
  +persist: BalancesPersist,
|}
