// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import keystore from 'services/keystore'
import getAddressWalletNames from 'utils/wallets/getAddressWalletNames'
import { selectWallets, selectWalletsAddresses } from 'store/stateSelectors'
import * as walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'

import * as walletsRenameAddress from '../modules/walletsRenameAddress'

function* openView(action: ExtractReturn<typeof walletsRenameAddress.openView>): Saga<void> {
  yield put(walletsRenameAddress.clean())

  const { address } = action.payload

  const {
    persist: {
      items,
      activeWalletId,
    },
  }: WalletsState = yield select(selectWallets)

  const walletNames: AddressNames = getAddressWalletNames(items)
  const isAddressWalletExist: boolean = !!walletNames[address]
  const isAddressValid: boolean = keystore.checkAddressValid(address)

  if (!items.length) {
    yield put(push('/wallets/start'))
  } else if (!activeWalletId) {
    yield put(push('/wallets'))
  } else if (!isAddressValid || isAddressWalletExist) {
    yield put(push('/wallets/addresses'))
  } else {
    const {
      persist: {
        addressNames,
      },
    }: WalletsAddressesState = yield select(selectWalletsAddresses)

    yield put(walletsRenameAddress.changeNameInput(addressNames[address] || ''))
  }
}

function* rename(action: ExtractReturn<typeof walletsRenameAddress.renameAddress>): Saga<void> {
  const { name, address } = action.payload

  if (!name) {
    yield* removeAddressName(address)

    return
  }

  const {
    persist: {
      items,
    },
  }: WalletsState = yield select(selectWallets)

  const {
    persist: {
      addressNames,
    },
  }: WalletsAddressesState = yield select(selectWalletsAddresses)

  const walletNames: AddressNames = getAddressWalletNames(items)
  const isWalletNameExist: boolean = !!Object.values(walletNames).includes(name)
  const isAddressNameExist: boolean = !!Object.values(addressNames).includes(name)

  if (isWalletNameExist || isAddressNameExist) {
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
  const {
    persist: {
      addressNames,
    },
  }: WalletsAddressesState = yield select(selectWalletsAddresses)

  const addressNamesNew: AddressNames = Object
    .keys(addressNames)
    .reduce((result: AddressNames, currentAddress: Address) => {
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
  yield takeEvery(walletsRenameAddress.RENAME_ADDRESS, rename)
}
