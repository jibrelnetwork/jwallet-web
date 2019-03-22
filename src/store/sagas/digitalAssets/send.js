// @flow

import { t } from 'ttag'
import { actions as router5Actions } from 'redux-router5'
import * as qs from 'query-string'

import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'

import web3 from 'services/web3'
import isVoid from 'utils/type/isVoid'
import checkETH from 'utils/digitalAssets/checkETH'
import reactRouterBack from 'utils/browser/reactRouterBack'
import getTransactionValue from 'utils/transactions/getTransactionValue'
import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'
import { selectTickerItemCourseByCurrency } from 'store/selectors/ticker'

import {
  checkAddressValid,
  getAddressChecksum,
} from 'utils/address'

import {
  getPrivateKey,
  GetPrivateKeyError,
} from 'store/sagas/wallets/core'

import {
  fromWeiToGWei,
  fromGweiToWei,
  toBigNumber,
  isValidNumeric,
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

import * as comments from 'store/modules/comments'
import * as transactions from 'store/modules/transactions'
import * as digitalAssetsSend from 'store/modules/digitalAssetsSend'

const MIN_GAS_PRICE_COEFFICIENT = 0.25

const isValidNumericAndBiggerThanZero = (value: string): boolean =>
  isValidNumeric(value) && parseFloat(value) > 0

function* requestGasPrice(): Saga<?BigNumber> {
  try {
    const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

    if (!network) {
      throw new Error(t`ActiveNetworkNotFoundError`)
    }

    const gasPrice: BigNumber = yield call(web3.getGasPrice, network)

    return gasPrice
  } catch (err) {
    console.log(err)

    return null
  }
}

function* openView(action: ExtractReturn<typeof digitalAssetsSend.openView>): Saga<void> {
  const {
    to,
    asset,
    amount,
    comment,
  } = qs.parse(action.payload.query)

  if (to) {
    yield put(digitalAssetsSend.setFormFieldValue('recipient', to))
  } else {
    yield put(digitalAssetsSend.setFormFieldValue('recipient', ''))
  }

  if (asset) {
    yield put(digitalAssetsSend.setFormFieldValue('assetAddress', asset))
  } else {
    yield put(digitalAssetsSend.setFormFieldValue('assetAddress', 'Ethereum'))
  }

  if (amount) {
    yield put(digitalAssetsSend.setFormFieldValue('amount', amount))
  }

  if (comment) {
    yield put(digitalAssetsSend.setFormFieldValue('comment', comment))
  }

  const gasPrice = yield* requestGasPrice()

  if (gasPrice) {
    yield put(digitalAssetsSend.setRequestedGasPrice(gasPrice.toString()))
  } else {
    yield put(digitalAssetsSend.setRequestedGasPrice(null))
  }
}

function* requestNonce(defaultBlock: BlockId): Saga<?number> {
  const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

  if (!network) {
    throw new Error(t`ActiveNetworkNotFoundError`)
  }

  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  if (!ownerAddress) {
    throw new Error(t`ActiveWalletNotFoundError`)
  }

  try {
    const nonce: number = yield call(web3.getNonce, network, ownerAddress, defaultBlock)

    return nonce
  } catch (err) {
    console.log(err)

    return null
  }
}

function* requestGasLimit(): Saga<?number> {
  const {
    formFieldValues: {
      assetAddress,
      recipient,
      amount,
    },
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

  if (!network) {
    throw new Error(t`ActiveNetworkNotFoundError`)
  }

  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  if (!ownerAddress) {
    throw new Error(t`ActiveWalletNotFoundError`)
  }

  const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
    yield select(selectDigitalAsset, assetAddress)

  const isAmountValid: boolean = isValidNumericAndBiggerThanZero(amount)
  const isRecipientValid: boolean = checkAddressValid(recipient)

  if (!(isAmountValid && isRecipientValid && digitalAsset)) {
    console.error('Can\'t request gas limit, some parameters are absent')
    yield put(digitalAssetsSend.setFormFieldError('amount', t`Invalid amount`))

    return null
  }

  const {
    blockchainParams: {
      staticGasAmount,
    },
  } = digitalAsset

  try {
    const gasAmount = staticGasAmount || web3.ETH_DEFAULT_GAS_LIMIT
    const sendAmount = getTransactionValue(amount, digitalAsset.blockchainParams.decimals)

    if (checkETH(assetAddress)) {
      const contractCode: string = yield call(
        web3.getSmartContractCode,
        network,
        recipient,
      )

      if (contractCode !== web3.ZERO_HEX) {
        const estimatedGas: number = yield call(
          web3.estimateETHGas,
          network,
          recipient,
          sendAmount,
        )

        return estimatedGas
      }

      return gasAmount
    } else {
      const estimatedGas: number = yield call(
        web3.estimateContractGas,
        network,
        assetAddress,
        ownerAddress,
        recipient,
        sendAmount,
      )

      return (estimatedGas > gasAmount)
        ? estimatedGas
        : gasAmount
    }
  } catch (err) {
    console.error(err)

    // fallback, now we are using staticGasAmount when we can't request gasLimit
    if (staticGasAmount) {
      yield put(digitalAssetsSend.setIsPotentiallyFail(true))

      return staticGasAmount
    } else {
      return null
    }
  }
}

function* checkPriority(
  digitalAsset: DigitalAsset,
  priority: TXPriorityKey,
  formFieldValues: DigitalAssetsSendFormFields,
): Saga<boolean> {
  const {
    gasPrice: userGasPrice,
    gasLimit: userGasLimit,
  } = formFieldValues

  // get the latest (before transaction sending) gas price
  const requestedGasPrice: ?BigNumber = yield* requestGasPrice()

  if (!requestedGasPrice) {
    yield put(digitalAssetsSend.setRequestedGasPrice(null))
    yield put(digitalAssetsSend.setFormFieldError('gasPrice', t`Can't request gas price`))

    return
  }

  yield put(digitalAssetsSend.setRequestedGasPrice(requestedGasPrice.toString()))

  const requestedGasLimit: ?number = yield* requestGasLimit()

  if (priority === 'CUSTOM') {
    const isGasPriceValid: boolean = isValidNumericAndBiggerThanZero(userGasPrice)
    const isGasLimitValid: boolean = isValidNumeric(userGasLimit) &&
      parseInt(userGasLimit, 10) > 0

    if (!isGasPriceValid) {
      yield put(digitalAssetsSend.setFormFieldError('gasPrice', t`Invalid value for gas price`))
    }

    if (!isGasLimitValid) {
      yield put(digitalAssetsSend.setFormFieldError('gasLimit', t`Invalid value for gas limit`))
    }

    if (isGasLimitValid && isGasPriceValid) {
      // convert it to WEI
      const gasPrice: string = fromGweiToWei(userGasPrice)
      yield put(digitalAssetsSend.setFinalGasPrice(gasPrice))

      const gasLimit: string = toBigNumber(userGasLimit).toString()
      yield put(digitalAssetsSend.setFinalGasLimit(gasLimit))
    }
  } else {
    if (!requestedGasLimit) {
      yield put(
        digitalAssetsSend.setFormFieldError(
          'gasLimit',
          t`Can't request gas limit, please use custom priority`,
        ),
      )

      return
    }

    const txPriorityCoefficient: number = digitalAssetsSend.TXPRIORITY[priority]

    if (!txPriorityCoefficient) {
      yield put(digitalAssetsSend.setFormFieldError('gasPrice', t`Priority is not selected`))

      return
    }

    const gasPrice = requestedGasPrice.times(txPriorityCoefficient).toString()

    // save for the next step
    yield put(digitalAssetsSend.setFinalGasPrice(gasPrice))
    yield put(digitalAssetsSend.setFinalGasLimit(String(requestedGasLimit)))
  }
}

function* checkAmount(digitalAsset: DigitalAsset): Saga<void> {
  const networkId: ExtractReturn<typeof selectCurrentNetworkId> =
    yield select(selectCurrentNetworkId)

  const currentBlock: ExtractReturn<typeof selectCurrentBlock> =
    yield select(selectCurrentBlock, networkId)

  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  const assetBalance: ExtractReturn<typeof selectBalanceByAssetAddress> = yield select(
    selectBalanceByAssetAddress,
    networkId,
    ownerAddress,
    currentBlock ? currentBlock.number.toString() : null,
    digitalAsset.blockchainParams.address,
  )

  if (!assetBalance) {
    return
  }

  const {
    formFieldValues: {
      amount,
    },
    finalGasValues: {
      gasPrice,
      gasLimit,
    },
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  const amountToSend = getTransactionValue(amount, digitalAsset.blockchainParams.decimals)
  const balance = toBigNumber(assetBalance.value)

  const feeETH = (gasPrice && gasLimit)
    ? toBigNumber(gasPrice).times(gasLimit)
    : toBigNumber(0)

  if (checkETH(digitalAsset.blockchainParams.address)) {
    if (balance.lt(amountToSend)) {
      yield put(digitalAssetsSend.setFormFieldError('amount', t`Amount exceeds balance`))
    } else {
      const amountWithFee: BigNumber = amountToSend.plus(feeETH)

      if (balance.lt(amountWithFee)) {
        // eslint-disable-next-line max-len
        yield put(digitalAssetsSend.setFormFieldError('amount', t`Amount plus blockchain fee exceeds balance`))
      }
    }
  } else {
    if (balance.lt(amountToSend)) {
      yield put(digitalAssetsSend.setFormFieldError('amount', t`Amount exceeds balance`))

      return
    }

    const ethBalance: ExtractReturn<typeof selectBalanceByAssetAddress> = yield select(
      selectBalanceByAssetAddress,
      networkId,
      ownerAddress,
      currentBlock ? currentBlock.number.toString() : null,
      'Ethereum',
    )

    if (ethBalance && toBigNumber(ethBalance.value).lt(feeETH)) {
      // eslint-disable-next-line max-len
      yield put(digitalAssetsSend.setFormFieldError('amount', t`You don't have enough ETH to send this transaction`))
    }
  }
}

function* checkNonce(formFieldValues: DigitalAssetsSendFormFields): Saga<void> {
  const userNonce = formFieldValues.nonce

  if (userNonce === '') {
    return
  }

  const isNonceValid: boolean = parseInt(userNonce, 10) >= 0

  if (!isNonceValid) {
    yield put(digitalAssetsSend.setFormFieldError('nonce', t`Invalid nonce`))

    return
  }

  const nonce: ?number = yield* requestNonce('latest')

  if (isVoid(nonce)) {
    yield put(digitalAssetsSend.setFormFieldError('nonce', t`Can't request nonce`))

    return
  }

  if (nonce > parseInt(userNonce, 10)) {
    const suggestedNonce: number = (nonce > 0) ? nonce - 1 : 0

    yield put(
      digitalAssetsSend.setFormFieldError(
        'nonce',
        t`Nonce should be greater than ${suggestedNonce}`,
      ),
    )
  }
}

function* prepareAndCheckDigitalAssetsSendData(): Saga<boolean> {
  const {
    formFieldValues,
    priority,
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  const {
    // nonce,
    amount,
    assetAddress,
    recipient,
  }: DigitalAssetsSendFormFields = formFieldValues

  yield put(digitalAssetsSend.cleanValidationErrors())

  const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
    yield select(selectDigitalAsset, assetAddress)

  // simple fields
  const isRecipientAddressValid: boolean = checkAddressValid(recipient)

  const isAmountValid: boolean = isValidNumericAndBiggerThanZero(amount)

  if (!isAmountValid) {
    yield put(digitalAssetsSend.setFormFieldError('amount', t`Invalid amount`))

    return false
  }

  if (!isRecipientAddressValid) {
    yield put(digitalAssetsSend.setFormFieldError('recipient', t`Invalid address`))
  }

  if (!digitalAsset) {
    yield put(digitalAssetsSend.setFormFieldError('assetAddress', t`Invalid asset address`))
  }

  if (!(isRecipientAddressValid && digitalAsset)) {
    return false
  }

  yield* checkNonce(formFieldValues)
  yield* checkPriority(digitalAsset, priority, formFieldValues)
  yield* checkAmount(digitalAsset)

  // check, that errors in the all fields are empty
  const {
    formFieldErrors,
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  const hasErrors = Object.keys(formFieldErrors).reduce(
    (res, cur: string) => res || formFieldErrors[cur], false,
  )

  return !hasErrors
}

function* addPendingTransaction(
  hash: Hash,
  formFieldValues: DigitalAssetsSendFormFields,
  networkId: NetworkId,
  decimals: number,
  gasValues: GasValues,
): Saga<void> {
  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  if (!ownerAddress) {
    throw new Error(t`ActiveWalletNotFoundError`)
  }

  const {
    gasLimit,
    gasPrice,
  }: GasValues = gasValues

  if (!(gasPrice && parseInt(gasLimit, 10))) {
    throw new Error(t`GasValuesError`)
  }

  const {
    amount,
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
        status: 1,
        gasUsed: parseInt(gasLimit, 10),
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
    },
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
  gasValues: GasValues,
): Saga<void> {
  const {
    comment,
    assetAddress,
  }: DigitalAssetsSendFormFields = formFieldValues

  yield put(router5Actions.navigateTo(
    'Wallet.Transactions.Asset',
    { address: assetAddress },
  ))

  yield* addPendingTransaction(txHash, formFieldValues, networkId, decimals, gasValues)
  yield* addTransactionComment(txHash, comment)
}

function* sendTransactionRequest(
  formFieldValues: DigitalAssetsSendFormFields,
  gasValues: GasValues,
): Saga<void> {
  const {
    nonce,
    amount,
    password,
    recipient,
    assetAddress,
  } = formFieldValues

  const {
    gasLimit,
    gasPrice,
  } = gasValues

  if (!password) {
    yield put(digitalAssetsSend.setFormFieldError('password', t`Please input password`))

    return
  }

  const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

  if (!network) {
    throw new Error(t`ActiveNetworkNotFoundError`)
  }

  const walletId: ExtractReturn<typeof selectActiveWalletId> = yield select(selectActiveWalletId)

  if (!walletId) {
    throw new Error(t`ActiveWalletNotFoundError`)
  }

  const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
    yield select(selectDigitalAsset, assetAddress)

  if (!digitalAsset) {
    throw new Error(t`DigitalAssetNotFound`)
  }

  const {
    address,
    decimals,
  }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

  yield put(digitalAssetsSend.setIsLoading(true))

  try {
    const privateKey: string = yield* getPrivateKey(walletId, password)

    const txData: SendTransactionProps = {
      to: recipient,
      gasLimit: gasLimit
        ? toBigNumber(gasLimit)
        : undefined,
      gasPrice: gasPrice
        ? toBigNumber(gasPrice)
        : undefined,
      privateKey: (privateKey.substr(0, 2) === '0x')
        ? privateKey.substr(2)
        : privateKey,
      value: getTransactionValue(amount, decimals),
      nonce: (!Number.isNaN(parseInt(nonce, 10)))
        ? parseInt(nonce, 10)
        : undefined,
    }

    const txHash: Hash = yield call(web3.sendTransaction, network, address, txData)
    yield* sendTransactionSuccess(txHash, formFieldValues, network.id, decimals, gasValues)
  } catch (err) {
    if (err instanceof GetPrivateKeyError) {
      yield put(digitalAssetsSend.setFormFieldError('password', t`Invalid password`))
    } else {
      yield put(digitalAssetsSend.setSendAssetError(err.message))
    }
  }

  yield put(digitalAssetsSend.setIsLoading(false))
}

function* goToNextStep(): Saga<void> {
  const {
    formFieldValues,
    currentStep,
    finalGasValues,
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  switch (currentStep) {
    case digitalAssetsSend.STEPS.FORM: {
      const isDataValid: boolean = yield* prepareAndCheckDigitalAssetsSendData()

      if (isDataValid) {
        yield put(digitalAssetsSend.setCurrentStep(digitalAssetsSend.STEPS.CONFIRM))

        yield put(digitalAssetsSend.setFormFieldValue(
          'recipient',
          getAddressChecksum(formFieldValues.recipient),
        ))
      }

      break
    }

    case digitalAssetsSend.STEPS.CONFIRM: {
      yield* sendTransactionRequest(formFieldValues, finalGasValues)

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

function* updateGasLimit(): Saga<void> {
  const {
    formFieldValues: {
      assetAddress,
      amount,
      recipient,
    },
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  if (assetAddress &&
    isValidNumericAndBiggerThanZero(amount) &&
    checkAddressValid(recipient)
  ) {
    const gasLimit = yield* requestGasLimit()

    if (gasLimit) {
      yield put(digitalAssetsSend.setFormFieldValue('gasLimit', String(gasLimit)))
    } else {
      yield put(digitalAssetsSend.setFormFieldValue('gasLimit', ''))

      yield put(digitalAssetsSend.setFormFieldWarning(
        'gasLimit',
        t`Can't get gas limit. Most likely, your transaction will fail`,
      ))
    }
  }
}

function* updateGasPrice(): Saga<void> {
  const gasPrice: ?BigNumber = yield* requestGasPrice()

  if (!gasPrice) {
    digitalAssetsSend.setFormFieldError('gasPrice', t`Can't request gas price`)

    return
  }

  yield put(digitalAssetsSend.setRequestedGasPrice(gasPrice.toString()))

  if (gasPrice.gt(0)) {
    yield put(
      digitalAssetsSend.setFormFieldValue('gasPrice', fromWeiToGWei(gasPrice)),
    )
  }
}

function* usePredefinedPriority(): Saga<void> {
  const {
    priority,
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  if (priority === 'CUSTOM') {
    yield put(digitalAssetsSend.setPriority('NORMAL'))
  }
}

function* checkGasLimitWarning(newGasLimit: string): Saga<void> {
  const {
    formFieldWarnings,
    requestedGasValues,
  }: DigitalAssetsSendState = yield select(selectDigitalAssetsSend)

  // Priority warnings
  const gasLimit = parseInt(newGasLimit, 10)
  const actualGasLimit = parseInt(requestedGasValues.gasLimit, 10)

  if (!Number.isNaN(gasLimit) &&
      !Number.isNaN(actualGasLimit) &&
      gasLimit > 0 &&
      gasLimit < actualGasLimit) {
    yield put(digitalAssetsSend.setFormFieldWarning(
      'gasLimit',
      t`Gas limit is too small. Most likely, your transaction will fail`,
    ))
  } else if (formFieldWarnings.gasLimit) {
    yield put(digitalAssetsSend.setFormFieldWarning('gasLimit', ''))
  }
}

function* checkGasPriceWarning(newGasPrice: string): Saga<void> {
  const {
    formFieldWarnings,
    requestedGasValues,
  }: DigitalAssetsSendState = yield select(selectDigitalAssetsSend)

  // Priority warnings
  const gasPrice = parseFloat(newGasPrice) // GWEI
  const initialGasPrice = parseInt(requestedGasValues.gasPrice, 10) // WEI

  if (gasPrice > 0 && initialGasPrice > 0) {
    const gasPriceWei = parseInt(fromGweiToWei(gasPrice), 10)

    if (gasPriceWei < initialGasPrice * MIN_GAS_PRICE_COEFFICIENT) {
      yield put(digitalAssetsSend.setFormFieldWarning(
        'gasPrice',
        t`Gas price is too small. Most likely, your transaction will fail`,
      ))
    }
  } else if (formFieldWarnings.gasPrice) {
    yield put(digitalAssetsSend.setFormFieldWarning('gasPrice', ''))
  }
}

function* checkRecipientWarning(newValue: string): Saga<void> {
  const {
    formFieldWarnings: {
      recipient: recipientWarning,
    },
  }: DigitalAssetsSendState = yield select(selectDigitalAssetsSend)

  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  if (ownerAddress === newValue && !recipientWarning) {
    yield put(
      digitalAssetsSend.setFormFieldWarning('recipient', t`Recipient is the same as sender`),
    )
  }
}

function* convertAmountToFiat(amount: string, assetAddress: Address): Saga<?string> {
  const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
    yield select(selectDigitalAsset, assetAddress)

  if (!(digitalAsset && digitalAsset.priceFeed)) {
    return null
  }

  const {
    currencyID,
  }: DigitalAssetPriceFeed = digitalAsset.priceFeed

  const tickerCourse: ExtractReturn<typeof selectTickerItemCourseByCurrency> =
    yield select(selectTickerItemCourseByCurrency, String(currencyID))

  const isTickerCourseValid: boolean = parseFloat(tickerCourse) > 0

  if (!isTickerCourseValid) {
    return null
  }

  const fiatValue: BigNumber = toBigNumber(amount).times(tickerCourse)
  const roundedValue: string = fiatValue.lt(0.01) ? '0.01' : fiatValue.toFixed(2)

  return roundedValue
}

function* refreshFiatAmount(): Saga<void> {
  const {
    formFieldValues: {
      amount,
      assetAddress,
    },
  }: DigitalAssetsSendState = yield select(selectDigitalAssetsSend)

  if (!isValidNumericAndBiggerThanZero(amount)) {
    yield put(digitalAssetsSend.setFormFieldValue('amountFiat', ''))

    return
  }

  const fiatValue: ?string = yield* convertAmountToFiat(amount, assetAddress)

  if (fiatValue) {
    yield put(digitalAssetsSend.setFormFieldValue('amountFiat', `≈\u202F${fiatValue}`))
  } else {
    yield put(digitalAssetsSend.setFormFieldValue('amountFiat', '—'))
  }
}

function* onFormFieldChange(
  action: ExtractReturn<typeof digitalAssetsSend.setFormFieldValue>,
): Saga<void> {
  const {
    payload: {
      fieldName,
      value,
    },
  } = action

  if (fieldName === 'assetAddress' || fieldName === 'recipient' || fieldName === 'amount') {
    yield* updateGasLimit()
  }

  if (fieldName === 'assetAddress' ||
       fieldName === 'recipient') {
    yield* checkRecipientWarning(value)
    yield* usePredefinedPriority()
  }

  if (fieldName === 'gasLimit') {
    yield* checkGasLimitWarning(value)
  }

  if (fieldName === 'gasPrice') {
    yield* checkGasPriceWarning(value)
  }

  if (fieldName === 'amount' ||
    fieldName === 'assetAddress' ||
    fieldName === 'recipient') {
    yield* refreshFiatAmount()
  }
}

function* onPriorityChange(): Saga<void> {
  const {
    priority,
  }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

  if (priority === 'CUSTOM') {
    // request and set gas price
    yield* updateGasPrice()
    yield* updateGasLimit()
  }
}

function* onStartNonceEdit(
  action: ExtractReturn<typeof digitalAssetsSend.setNonceEditable>,
): Saga<void> {
  const { isEditable } = action.payload

  if (isEditable) {
    const nonce: ?number = yield* requestNonce('pending')

    const {
      formFieldValues,
    }: ExtractReturn<typeof selectDigitalAssetsSend> = yield select(selectDigitalAssetsSend)

    const userNonce: string = formFieldValues.nonce

    if (userNonce) {
      return
    }

    if (isVoid(nonce)) {
      yield put(digitalAssetsSend.setFormFieldError('nonce', t`Can't request nonce`))

      return
    }

    yield put(digitalAssetsSend.setFormFieldValue('nonce', String(nonce)))
  }
}

export function* digitalAssetsSendRootSaga(): Saga<void> {
  yield takeEvery(digitalAssetsSend.OPEN_VIEW, openView)
  yield takeEvery(digitalAssetsSend.GO_TO_NEXT_STEP, goToNextStep)
  yield takeEvery(digitalAssetsSend.GO_TO_PREV_STEP, goToPrevStep)
  yield takeEvery(digitalAssetsSend.SET_PRIORITY, onPriorityChange)
  yield takeEvery(digitalAssetsSend.SET_FORM_FIELD_VALUE, onFormFieldChange)
  yield takeEvery(digitalAssetsSend.SET_NONCE_EDITABLE, onStartNonceEdit)
}
