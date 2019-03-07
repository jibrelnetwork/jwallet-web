// @flow

import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'

import {
  getPrivateKey,
} from 'store/sagas/wallets/core'

import web3 from 'services/web3'

import { toBigNumber } from 'utils/numbers'
import { checkETH } from 'utils/digitalAssets'
import { getTransactionValue } from 'utils/transactions'

import { selectDigitalAsset } from 'store/selectors/digitalAssets'
import { selectCurrentNetwork } from 'store/selectors/networks'
import { selectActiveWalletAddress }  from 'store/selectors/wallets'

import * as digitalAssetsSendWizard from 'store/modules/digitalAssetsSendWizard'
import * as transactions from 'store/modules/transactions'

type RequestPrivateKeyAction = ExtractReturn<typeof digitalAssetsSendWizard.requestPrivateKey>
type SendTransactionAction = ExtractReturn<typeof digitalAssetsSendWizard.sendTransaction>
type AddPendingTransactionAction =
  ExtractReturn<typeof digitalAssetsSendWizard.addPendingTransaction>

function* requestPrivateKey(action: RequestPrivateKeyAction): Saga<void> {
  const {
    meta: {
      resolver,
    },
    payload: {
      walletId,
      password,
    },
  } = action

  try {
    const privateKey: string = yield* getPrivateKey(walletId, password)

    resolver.resolve({
      privateKey,
    })
  } catch (err) {
    resolver.reject(err)
  }
}

function* sendTransaction(action: SendTransactionAction): Saga<void> {
  const {
    meta: {
      resolver,
    },
    payload: {
      asset,
      nonce,
      amount,
      gasPrice,
      gasLimit,
      recipient,
      privateKey,
    },
  } = action

  try {
    const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

    if (!network) {
      throw new Error('ActiveNetworkNotFoundError')
    }

    const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
      yield select(selectDigitalAsset, asset)

    if (!digitalAsset) {
      throw new Error('DigitalAssetNotFound')
    }

    const {
      address,
      decimals,
    }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

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

    resolver.resolve({
      txHash,
    })
  } catch (err) {
    resolver.reject(err)
  }
}

function* addPendingTransaction(action: AddPendingTransactionAction): Saga<void> {
  const {
    meta: {
      resolver,
    },
    payload: {
      sendTransactionPayload: {
        asset,
        amount,
        gasPrice,
        gasLimit,
        recipient,
      },
      txHash,
    },
  } = action

  try {
    const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

    if (!network) {
      throw new Error('ActiveNetworkNotFoundError')
    }

    const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
      yield select(selectActiveWalletAddress)

    if (!ownerAddress) {
      throw new Error('ActiveWalletNotFoundError')
    }

    const digitalAsset: ExtractReturn<typeof selectDigitalAsset> =
      yield select(selectDigitalAsset, asset)

    if (!digitalAsset) {
      throw new Error('DigitalAssetNotFound')
    }

    const {
      address,
      decimals,
    }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

    if (!(gasPrice && parseInt(gasLimit, 10))) {
      resolver.resolve()

      return
      // throw new Error(t`GasValuesError`)
    }

    yield put(transactions.addPendingTransaction(
      network.id,
      ownerAddress,
      address,
      {
        data: {
          gasPrice: gasPrice.toString(),
        },
        blockData: {
          timestamp: Date.now() / 1000,
        },
        receiptData: {
          status: 1,
          gasUsed: parseInt(gasLimit, 10),
        },
        hash: txHash,
        to: recipient,
        blockHash: null,
        blockNumber: null,
        from: ownerAddress,
        contractAddress: null,
        eventType: checkETH(asset) ? 0 : 1,
        amount: getTransactionValue(amount, decimals),
        isRemoved: false,
      },
    ))

    resolver.resolve()
  } catch (err) {
    resolver.reject(err)
  }
}

export function* digitalAssetsSendWizardRootSaga(): Saga<void> {
  yield takeEvery(digitalAssetsSendWizard.REQUEST_PRIVATE_KEY, requestPrivateKey)
  yield takeEvery(digitalAssetsSendWizard.SEND_TRANSACTION, sendTransaction)
  yield takeEvery(digitalAssetsSendWizard.ADD_PENDING_TRANSACTION, addPendingTransaction)
}

