// @flow

import { push } from 'react-router-redux'

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import checkAddressValid from 'utils/wallets/checkAddressValid'

import {
  selectAddressNames,
  selectWalletsItems,
  selectActiveWalletId,
  selectAddressWalletsNames,
} from 'store/selectors/wallets'

import * as walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'

import * as walletsRenameAddress from '../modules/walletsRenameAddress'

function* openView(action: ExtractReturn<typeof walletsRenameAddress.openView>): Saga<void> {
  yield put(walletsRenameAddress.clean())

  const { address } = action.payload

  const items: ExtractReturn<typeof selectWalletsItems> = yield select(selectWalletsItems)
  const walletId: ExtractReturn<typeof selectActiveWalletId> = yield select(selectActiveWalletId)

  const addressWalletsNames: ExtractReturn<typeof selectAddressWalletsNames> =
    yield select(selectAddressWalletsNames)

  const isAddressValid: boolean = checkAddressValid(address)
  const isAddressWalletExist: boolean = !!addressWalletsNames[address]

  if (!items.length) {
    yield put(push('/wallets/start'))
  } else if (!walletId) {
    yield put(push('/wallets'))
  } else if (!isAddressValid || isAddressWalletExist) {
    yield put(push('/wallets/addresses'))
  } else {
    const addressNames: ExtractReturn<typeof selectAddressNames> =
      yield select(selectAddressNames)

    yield put(walletsRenameAddress.changeNameInput(addressNames[address] || ''))
  }
}

function* renameAddress(
  action: ExtractReturn<typeof walletsRenameAddress.renameAddress>,
): Saga<void> {
  const {
    name,
    address,
  } = action.payload

  if (!name) {
    yield* removeAddressName(address)

    return
  }

  const addressNames: ExtractReturn<typeof selectAddressNames> =
    yield select(selectAddressNames)

  const addressWalletsNames: ExtractReturn<typeof selectAddressWalletsNames> =
    yield select(selectAddressWalletsNames)

  const isWalletNameExist: boolean = !!Object.values(addressWalletsNames).includes(name)

  if (isWalletNameExist) {
    yield put(walletsRenameAddress.setInvalidField('name', 'Wallet with this name already exists'))

    return
  }

  const isAddressNameExist: boolean = !!Object.values(addressNames).includes(name)

  if (isAddressNameExist) {
    yield put(walletsRenameAddress.setInvalidField('name', 'Address with this name already exists'))

    return
  }

  const addressNamesNew: AddressNames = {
    ...addressNames,
    [address]: name,
  }

  yield put(walletsAddresses.setAddressNames(addressNamesNew))
  yield put(push('/wallets/addresses'))
}

function* removeAddressName(address: string): Saga<void> {
  const addressNames: ExtractReturn<typeof selectAddressNames> =
    yield select(selectAddressNames)

  const addresses: Address[] = Object.keys(addressNames)

  const addressNamesNew: AddressNames = addresses
    .reduce((result: AddressNames, currentAddress: Address): AddressNames => {
      if (currentAddress === address) {
        return result
      }

      return {
        ...result,
        [currentAddress]: addressNames[currentAddress],
      }
    }, {})

  yield put(walletsAddresses.setAddressNames(addressNamesNew))
  yield put(push('/wallets/addresses'))
}

export function* walletsRenameAddressRootSaga(): Saga<void> {
  yield takeEvery(walletsRenameAddress.OPEN_VIEW, openView)
  yield takeEvery(walletsRenameAddress.RENAME_ADDRESS, renameAddress)
}
