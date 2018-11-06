// @flow

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
    value: Bignumber,
    privateKey: string,
    contractAddress?: Address,
    gasPrice?: Bignumber,
    gasLimit?: Bignumber,
    nonce?: Bignumber,
  }
