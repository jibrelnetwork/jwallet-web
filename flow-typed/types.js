import type { Saga } from 'redux-saga'

declare type Address = string

declare type DigitalAsset = {
  address: string,
  symbol: string,
  name: string,
  decimals: number,
  isAuthRequired: boolean,
  isLicensed: boolean,
  isCurrent: boolean,
  isCustom: boolean,
  isActive: boolean,
}

declare type DigitalAssets = Array<DigitalAsset>

declare type TokenData = {
  address: string,
  symbol: string,
  name: string,
  decimals: string,
}
