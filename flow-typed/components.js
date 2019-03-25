// @flow

declare type DigitalAssetsGridItemType = {
  +asset: DigitalAsset,
  +balance: BalanceString,
  +isLoading?: boolean,
}

declare type AddressPickerAddress = {|
  address: Address,
  title: string,
|}

declare type StyleComponent<Theme: ?string> = {
  theme: Theme,
  className?: ?string,
}
