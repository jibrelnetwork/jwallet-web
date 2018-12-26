// @flow

import { push } from 'react-router-redux'

import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'

import web3 from 'services/web3'
import checkETH from 'utils/digitalAssets/checkETH'
import checkAddressValid from 'utils/wallets/checkAddressValid'
import getTransactionValue from 'utils/transactions/getTransactionValue'
import { getPrivateKey } from 'routes/Wallets/sagas'
import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'

import {
  isZero,
  divDecimals,
  toBigNumber,
} from 'utils/numbers'

import {
  selectActiveWalletId,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  selectCurrentNetwork,
  selectCurrentNetworkId,
} from 'store/selectors/networks'

import {
  selectDigitalAsset,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'

import * as digitalAssetsSend from '../modules/digitalAssetsSend'

function* getAmountError(amount: string, digitalAsset: ?DigitalAsset): Saga<?string> {
  if (isZero(amount)) {
    return 'Amount should be greater than 0'
  }

  if (!digitalAsset) {
    return null
  }

  const {
    address,
    decimals,
  }: DigitalAsset = digitalAsset

  const networkId: ExtractReturn<typeof selectCurrentNetworkId> =
    yield select(selectCurrentNetworkId)

  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  const currentBlock: ExtractReturn<typeof selectCurrentBlock> =
    yield select(selectCurrentBlock, networkId)

  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0

  const assetBalance: ExtractReturn<typeof selectBalanceByAssetAddress> = yield select(
    selectBalanceByAssetAddress,
    networkId,
    ownerAddress,
    currentBlockNumber.toString(),
    address,
  )

  if (!assetBalance || assetBalance.isError) {
    return null
  }

  const balance: BigNumber = divDecimals(assetBalance.value, decimals)

  if (checkETH(address)) {
    const fee: BigNumber = divDecimals(0, decimals)
    const balanceWithFee: BigNumber = balance.plus(fee)

    if (balanceWithFee.lt(amount)) {
      return 'Amount exceeds balance'
    }
  } else if (balance.lt(amount)) {
    return 'Amount exceeds balance'
  }

  return null
}

function* checkDigitalAssetsSendData(formFieldValues: DigitalAssetsSendFormFields): Saga<boolean> {
  const {
    nonce,
    amount,
    gasLimit,
    gasPrice,
    recepient,
    assetAddress,
  }: DigitalAssetsSendFormFields = formFieldValues

  const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
    yield select(selectDigitalAsset, assetAddress)

  const isNonceInvalid: boolean = !!nonce && isZero(nonce)
  const isDigitalAssetAddressInvalid: boolean = !digitalAsset
  const isGasLimitInvalid: boolean = !!gasLimit && isZero(gasLimit)
  const isGasPriceInvalid: boolean = !!gasPrice && isZero(gasPrice)
  const isRecepientAddressInvalid: boolean = !checkAddressValid(recepient)
  const amountErrorMessage: ?string = yield* getAmountError(amount, digitalAsset)

  if (isRecepientAddressInvalid) {
    yield put(digitalAssetsSend.setFormFieldError('recepient', 'Invalid address'))
  }

  if (isDigitalAssetAddressInvalid) {
    yield put(digitalAssetsSend.setFormFieldError('assetAddress', 'Invalid asset address'))
  }

  if (amountErrorMessage) {
    yield put(digitalAssetsSend.setFormFieldError('amount', amountErrorMessage))
  }

  if (isNonceInvalid) {
    yield put(digitalAssetsSend.setFormFieldError('nonce', 'Invalid nonce'))
  }

  if (isGasLimitInvalid) {
    yield put(digitalAssetsSend.setFormFieldError('gasLimit', 'Invalid value for gas limit'))
  }

  if (isGasPriceInvalid) {
    yield put(digitalAssetsSend.setFormFieldError('gasPrice', 'Invalid value for gas limit'))
  }

  return !(
    isRecepientAddressInvalid ||
    isDigitalAssetAddressInvalid ||
    !!amountErrorMessage ||
    isNonceInvalid ||
    isGasLimitInvalid ||
    isGasPriceInvalid
  )
}

function* sendTransactionSuccess(
  txHash: Hash,
  assetAddress: AssetAddress,
  comment: string,
): Saga<void> {
  yield put(push(`/transactions/${assetAddress}`))
  console.log(txHash)
  console.log(comment)
}

function* sendTransactionError(err: Error): Saga<void> {
  yield put(digitalAssetsSend.setFormFieldError('password', err.message))
}

function getTransactionData(data: SendTransactionProps): SendTransactionProps {
  const {
    gas,
    value,
    gasPrice,
    to,
    privateKey,
    nonce,
  }: SendTransactionProps = data

  const dataNew: SendTransactionProps = {
    to,
    value,
    privateKey,
  }

  /* eslint-disable fp/no-mutation */
  if (!isZero(gas)) {
    dataNew.gas = gas
  }

  if (!isZero(gasPrice)) {
    dataNew.gasPrice = gasPrice
  }

  if (nonce) {
    dataNew.nonce = nonce
  }
  /* eslint-enable fp/no-mutation */

  return dataNew
}

function* sendTransactionRequest(formFieldValues: DigitalAssetsSendFormFields): Saga<void> {
  const {
    nonce,
    amount,
    comment,
    gasLimit,
    gasPrice,
    password,
    recepient,
    assetAddress,
  }: DigitalAssetsSendFormFields = formFieldValues

  if (!password) {
    yield put(digitalAssetsSend.setFormFieldError('password', 'Please input password'))

    return
  }

  const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

  if (!network) {
    throw new Error('There is no active network')
  }

  const walletId: ExtractReturn<typeof selectActiveWalletId> = yield select(selectActiveWalletId)

  if (!walletId) {
    throw new Error('There is no active wallet')
  }

  const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
    yield select(selectDigitalAsset, assetAddress)

  if (!digitalAsset) {
    throw new Error(`Digital asset is not found by address ${assetAddress}`)
  }

  const {
    address,
    decimals,
  }: DigitalAsset = digitalAsset

  yield put(digitalAssetsSend.setIsLoading(true))

  try {
    const privateKey: string = yield* getPrivateKey(walletId, password)

    const txData: SendTransactionProps = getTransactionData({
      gas: toBigNumber(gasLimit),
      gasPrice: toBigNumber(gasPrice),
      value: getTransactionValue(amount, decimals),
      to: recepient,
      privateKey: privateKey.substr(2),
      nonce: parseInt(nonce, 10) || 0,
    })

    const txHash: Hash = yield call(web3.sendTransaction, network, address, txData)
    yield* sendTransactionSuccess(txHash, address, comment)
  } catch (err) {
    yield* sendTransactionError(err)
  }

  yield put(digitalAssetsSend.setIsLoading(false))
}

function* goToNextStep(): Saga<void> {
  const {
    formFieldValues,
    currentStep,
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  switch (currentStep) {
    case digitalAssetsSend.STEPS.FORM: {
      const isDataValid: boolean = yield* checkDigitalAssetsSendData(formFieldValues)

      if (isDataValid) {
        yield put(digitalAssetsSend.setCurrentStep(digitalAssetsSend.STEPS.CONFIRM))
      }

      break
    }

    case digitalAssetsSend.STEPS.CONFIRM: {
      yield* sendTransactionRequest(formFieldValues)
      break
    }

    default:
      break
  }
}

function* goToPrevStep(): Saga<void> {
  const { currentStep }: ExtractReturn<typeof selectDigitalAssetsSend> =
    yield select(selectDigitalAssetsSend)

  switch (currentStep) {
    case digitalAssetsSend.STEPS.CONFIRM:
      yield put(digitalAssetsSend.setCurrentStep(digitalAssetsSend.STEPS.FORM))
      break

    default:
      yield put(push('/digital-assets/grid'))
      break
  }
}

export function* digitalAssetsSendRootSaga(): Saga<void> {
  yield takeEvery(digitalAssetsSend.GO_TO_NEXT_STEP, goToNextStep)
  yield takeEvery(digitalAssetsSend.GO_TO_PREV_STEP, goToPrevStep)
}
