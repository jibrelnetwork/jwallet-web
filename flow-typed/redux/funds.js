// @flow

import { BigNumber } from 'bignumber.js'

declare type SendFundsData = {
  +invalidFields: FormFields,
  +alert: string,
  +amount: string,
  +assetAddress: string,
  +recipient: Address,
  +password: string,
  +currentStep: number,
  +gas?: string,
  +gasPrice?: string,
  +nonce?: string,
}

declare type SendTransactionProps = {
  +value: string,
  +privateKey: string,
  +contractAddress: string,
  +recipient: OwnerAddress,
  +gas: string,
  +nonce: string,
  +gasPrice: string,
}

declare type ReceiveFundsData = {
  +invalidFields: FormFields,
  +assetAddress: Address,
  +amount: string,
  +isCopied: boolean,
}

declare type ConvertFundsData = {
  +invalidFields: FormFields,
  +fromAsset: string,
  +fromAmount: string,
  +toAsset: string,
  +toAmount: string,
}

declare type TXData = {
  to: Address,
  value: BigNumber,
  privateKey: string,
  contractAddress?: Address,
  gasPrice?: BigNumber,
  gasLimit?: BigNumber,
  nonce?: BigNumber,
}
