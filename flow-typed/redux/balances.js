// @flow

declare type FiatBalance = {|
  +value: string,
  +currency: string,
  +isLoading: boolean,
  +isError?: boolean,
|}

declare type Balance = {|
  +value: string,
  +isError?: boolean,
  +isLoading: boolean,
|}

declare type Balances = {
  [AssetAddress]: ?Balance,
}

declare type BalancesByBlockNumber = {
  [OwnerAddress]: ?Balances,
}

declare type BalancesByNetworkId = {
  [BlockNumber]: ?BalancesByBlockNumber,
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
