// @flow

import { push } from 'react-router-redux'
import * as qs from 'query-string'

import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'

import web3 from 'services/web3'
import checkETH from 'utils/digitalAssets/checkETH'
import reactRouterBack from 'utils/browser/reactRouterBack'
import checkAddressValid from 'utils/address/checkAddressValid'
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

import * as comments from 'routes/modules/comments'
import * as transactions from 'routes/modules/transactions'

import * as digitalAssetsSend from '../modules/digitalAssetsSend'

function* openView(action: ExtractReturn<typeof digitalAssetsSend.openView>): Saga<void> {
  const {
    to,
    gas,
    nonce,
    asset,
    amount,
    comment,
    gasPrice,
  } = qs.parse(action.payload.query)

  if (to) {
    yield put(digitalAssetsSend.setFormFieldValue('recipient', to))
  }

  if (asset) {
    yield put(digitalAssetsSend.setFormFieldValue('assetAddress', asset))
  }

  if (amount) {
    yield put(digitalAssetsSend.setFormFieldValue('amount', amount))
  }

  if (nonce) {
    yield put(digitalAssetsSend.setFormFieldValue('nonce', nonce))
  }

  if (gas) {
    yield put(digitalAssetsSend.setFormFieldValue('gasLimit', gas))
  }

  if (gasPrice) {
    yield put(digitalAssetsSend.setFormFieldValue('gasPrice', gasPrice))
  }

  if (gas || gasPrice) {
    yield put(digitalAssetsSend.setPriority('CUSTOM'))
  }

  if (comment) {
    yield put(digitalAssetsSend.setFormFieldValue('comment', comment))
  }
}

function* getAmountError(amount: string, digitalAsset: ?DigitalAsset): Saga<?string> {
  const isValidAmount: boolean = (parseFloat(amount) > 0)

  if (!isValidAmount) {
    return 'Amount should be greater than 0'
  }

  if (!digitalAsset) {
    return null
  }

  const {
    address,
    decimals,
  }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

  const networkId: ExtractReturn<typeof selectCurrentNetworkId> =
    yield select(selectCurrentNetworkId)

  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  const currentBlock: ExtractReturn<typeof selectCurrentBlock> =
    yield select(selectCurrentBlock, networkId)

  const assetBalance: ExtractReturn<typeof selectBalanceByAssetAddress> = yield select(
    selectBalanceByAssetAddress,
    networkId,
    ownerAddress,
    currentBlock ? currentBlock.number.toString() : null,
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
    recipient,
    assetAddress,
  }: DigitalAssetsSendFormFields = formFieldValues

  const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
    yield select(selectDigitalAsset, assetAddress)

  const isDigitalAssetAddressValid: boolean = !!digitalAsset
  const isRecepientAddressValid: boolean = checkAddressValid(recipient)
  const amountErrorMessage: ?string = yield* getAmountError(amount, digitalAsset)

  const isNonceExist: boolean = !!nonce.trim()
  const isGasLimitExist: boolean = !!gasLimit.trim()
  const isGasPriceExist: boolean = !!gasPrice.trim()

  const isNonceValid: boolean = (parseInt(nonce, 10) > 0)
  const isGasLimitValid: boolean = (parseInt(gasLimit, 10) > 0)
  const isGasPriceValid: boolean = (parseInt(gasPrice, 10) > 0)

  if (!isRecepientAddressValid) {
    yield put(digitalAssetsSend.setFormFieldError('recipient', 'Invalid address'))
  }

  if (!isDigitalAssetAddressValid) {
    yield put(digitalAssetsSend.setFormFieldError('assetAddress', 'Invalid asset address'))
  }

  if (amountErrorMessage) {
    yield put(digitalAssetsSend.setFormFieldError('amount', amountErrorMessage))
  }

  if (isNonceExist && !isNonceValid) {
    yield put(digitalAssetsSend.setFormFieldError('nonce', 'Invalid nonce'))
  }

  if (isGasLimitExist && !isGasLimitValid) {
    yield put(digitalAssetsSend.setFormFieldError('gasLimit', 'Invalid value for gas limit'))
  }

  if (isGasPriceExist && !isGasPriceValid) {
    yield put(digitalAssetsSend.setFormFieldError('gasPrice', 'Invalid value for gas price'))
  }

  return !(
    !isRecepientAddressValid ||
    !isDigitalAssetAddressValid ||
    !!amountErrorMessage ||
    (isNonceExist && !isNonceValid) ||
    (isGasLimitExist && !isGasLimitValid) ||
    (isGasPriceExist && !isGasPriceValid)
  )
}

function* addPendingTransaction(
  hash: Hash,
  formFieldValues: DigitalAssetsSendFormFields,
  networkId: NetworkId,
  decimals: number,
): Saga<void> {
  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  if (!ownerAddress) {
    throw new Error('There is no active wallet')
  }

  const {
    amount,
    gasLimit,
    gasPrice,
    recipient,
    assetAddress,
  }: DigitalAssetsSendFormFields = formFieldValues

  yield put(transactions.addPendingTransaction(
    networkId,
    ownerAddress,
    assetAddress,
    {
      data: {
        gasPrice,
      },
      blockData: {
        timestamp: Date.now() / 1000,
      },
      receiptData: {
        gasUsed: parseInt(gasLimit, 10) || 0,
        status: 1,
      },
      hash,
      to: recipient,
      blockHash: null,
      blockNumber: null,
      from: ownerAddress,
      contractAddress: null,
      eventType: checkETH(assetAddress) ? 0 : 1,
      amount: getTransactionValue(amount, decimals),
      isRemoved: false,
    }
  ))
}

function* addTransactionComment(txHash: Hash, comment: string): Saga<void> {
  if (!comment) {
    return
  }

  yield put(comments.edit(txHash, comment))
}

function* sendTransactionSuccess(
  txHash: Hash,
  formFieldValues: DigitalAssetsSendFormFields,
  networkId: NetworkId,
  decimals: number,
): Saga<void> {
  const {
    comment,
    assetAddress,
  }: DigitalAssetsSendFormFields = formFieldValues

  yield put(push(`/transactions/${assetAddress}`))
  yield* addPendingTransaction(txHash, formFieldValues, networkId, decimals)
  yield* addTransactionComment(txHash, comment)
}

function* sendTransactionError(err: Error): Saga<void> {
  yield put(digitalAssetsSend.setFormFieldError('password', err.message))
}

function getTransactionData(data: SendTransactionProps): SendTransactionProps {
  const {
    value,
    gasLimit,
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
  if (!isZero(gasLimit)) {
    // dataNew.gasLimit = gasLimit
  }

  if (!isZero(gasPrice)) {
    // dataNew.gasPrice = gasPrice
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
    gasLimit,
    gasPrice,
    password,
    recipient,
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
  }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

  yield put(digitalAssetsSend.setIsLoading(true))

  try {
    const privateKey: string = yield* getPrivateKey(walletId, password)

    const txData: SendTransactionProps = getTransactionData({
      to: recipient,
      gasLimit: toBigNumber(gasLimit),
      gasPrice: toBigNumber(gasPrice),
      privateKey: privateKey.substr(2),
      value: getTransactionValue(amount, decimals),
      nonce: parseInt(nonce, 10) || 0,
    })

    const logTxData = {
      ...txData,
      privateKey: '[removed]',
    }
    console.log(`Send transaction (to: ${address}) network: `, network)
    console.log(`Send transaction (to: ${address}) txData: `, logTxData)

    const txHash: Hash = yield call(web3.sendTransaction, network, address, txData)
    yield* sendTransactionSuccess(txHash, formFieldValues, network.id, decimals)
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
      yield put(reactRouterBack({ fallbackUrl: '/digital-assets' }))
      break
  }
}

export function* digitalAssetsSendRootSaga(): Saga<void> {
  yield takeEvery(digitalAssetsSend.OPEN_VIEW, openView)
  yield takeEvery(digitalAssetsSend.GO_TO_NEXT_STEP, goToNextStep)
  yield takeEvery(digitalAssetsSend.GO_TO_PREV_STEP, goToPrevStep)
}
