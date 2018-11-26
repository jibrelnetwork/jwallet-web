// @flow

type OwnerAddress = string
type AssetAddress = string
type NetworkIdOptional = ?string
type BlockNumberOptional = ?string

declare type Balance = {|
  balance: string | Bignumber,
  isLoading: boolean,
|}

declare type OwnerBalances = {
  [AssetAddress]: Balance,
}

declare type BlockBalances = {
  [OwnerAddress]: OwnerBalances,
}

declare type Balances = {
  [NetworkIdOptional]: {
    [BlockNumberOptional]: BlockBalances,
  }
}

declare type BalancesState = {|
  persist: {|
    balances: Balances,
  |}
|}
