// @flow

declare type DigitalAssetsGridItemType = {
  +asset: DigitalAsset,
  +balance: ?{
    balance: Bignumber,
    isLoading: boolean,
  },
}
