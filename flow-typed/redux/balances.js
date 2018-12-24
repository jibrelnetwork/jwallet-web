// @flow

declare type FiatBalance = {|
  +value: string,
  +currency: string,
  +isLoading: boolean,
  +isError?: boolean,
|}

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
