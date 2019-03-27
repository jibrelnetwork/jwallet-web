// @flow

import { push } from 'react-router-redux'
import { t } from 'ttag'

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import {
  checkAddressValid,
  getAddressChecksum,
} from 'utils/address'

import {
  selectAddressNames,
  selectAddressWalletsNames,
} from 'store/selectors/wallets'

import {
  selectFavoritesItems,
  selectFavoritesAddressNames,
} from 'store/selectors/favorites'

import * as favorites from '../modules/favorites'

function* checkFavoriteDataValid(name: string, description: string, address?: string): Saga<void> {
  const isNameInvalid: boolean = (name.length < 2)
  const isAddressInvalid: boolean = !!address && !checkAddressValid(address)
  const isDescriptionInvalid: boolean = !!description && (description.length < 2)

  if (isAddressInvalid) {
    yield put(favorites.setFormFieldError('address', t`Please input valid address`))
  }

  if (isNameInvalid) {
    yield put(favorites.setFormFieldError('name', t`Name length should be at least 2 symbols`))
  }

  if (isDescriptionInvalid) {
    yield put(
      favorites.setFormFieldError(
        'description',
        t`Description length should be at least 2 symbols`,
      ),
    )
  }

  if (isNameInvalid || isAddressInvalid || isDescriptionInvalid) {
    return false
  }

  return true
}

function* checkFavoriteAlreadyExists(items: Favorites, address: string, name: string): Saga<void> {
  const foundItem: ?Favorite = items[address]

  if (foundItem && foundItem.isAddedByUser) {
    yield put(favorites.setFormFieldError('address', t`Favorite with this address already exists`))

    return true
  }

  const favoritesAddressNames: ExtractReturn<typeof selectFavoritesAddressNames> =
    yield select(selectFavoritesAddressNames)

  const isFavoriteNameExist: boolean = !!Object.values(favoritesAddressNames).includes(name)

  if (isFavoriteNameExist) {
    yield put(favorites.setFormFieldError('name', t`Favorite with this name already exists`))

    return true
  }

  const addressWalletsNames: ExtractReturn<typeof selectAddressWalletsNames> =
    yield select(selectAddressWalletsNames)

  const isAddressWalletsNameExist: boolean = !!Object.values(addressWalletsNames).includes(name)

  if (isAddressWalletsNameExist) {
    yield put(favorites.setFormFieldError('name', t`There is wallet with such name`))

    return true
  }

  const addressNames: ExtractReturn<typeof selectAddressNames> =
    yield select(selectAddressNames)

  const isAddressNameExist: boolean = !!Object.values(addressNames).includes(name)

  if (isAddressNameExist) {
    yield put(favorites.setFormFieldError('name', t`There is address with such name`))

    return true
  }

  return false
}

function getFavoriteData(
  address: string,
  name: string,
  description: string,
  isAddedByUser: boolean,
): Favorite {
  return {
    address,
    isAddedByUser,
    name: name.trim(),
    description: description.trim(),
  }
}

function* edit(action: ExtractReturn<typeof favorites.edit>): Saga<void> {
  const items: ExtractReturn<typeof selectFavoritesItems> = yield select(selectFavoritesItems)

  const {
    name,
    address,
    description,
  } = action.payload

  const isValid: boolean = yield checkFavoriteDataValid(name, description)
  const isFound: boolean = !!items[address]

  if (!(isFound && isValid)) {
    return
  }

  const newFavorites: Favorites = {
    ...items,
    [address]: getFavoriteData(address, name, description, true),
  }

  yield put(favorites.setItems(newFavorites))
  yield put(push('/favorites'))
}

function* remove(action: ExtractReturn<typeof favorites.remove>): Saga<void> {
  const items: ExtractReturn<typeof selectFavoritesItems> = yield select(selectFavoritesItems)

  const { address } = action.payload
  const isFound: boolean = !!items[address]

  if (!isFound) {
    return
  }

  const favoriteAddresses: OwnerAddress[] = Object.keys(items)

  const newFavorites: Favorites = favoriteAddresses
    .reduce((result: Favorites, i: OwnerAddress): Favorites => (i === address) ? result : {
      ...result,
      [i]: items[i],
    }, {})

  yield put(favorites.setItems(newFavorites))
}

function* addByUser(action: ExtractReturn<typeof favorites.addByUser>): Saga<void> {
  const items: ExtractReturn<typeof selectFavoritesItems> = yield select(selectFavoritesItems)

  const {
    name,
    address,
    description,
  } = action.payload

  const isValid: boolean = yield checkFavoriteDataValid(name, description, address)
  const isExist: boolean = yield checkFavoriteAlreadyExists(items, address, name)

  if (isExist || !isValid) {
    return
  }

  const checksumAddres: Address = getAddressChecksum(address)

  const newFavorites: Favorites = {
    ...items,
    [checksumAddres]: getFavoriteData(checksumAddres, name, description, true),
  }

  yield put(favorites.setItems(newFavorites))
  yield put(push('/favorites'))
}

function* addAuto(action: ExtractReturn<typeof favorites.addAuto>): Saga<void> {
  const items: ExtractReturn<typeof selectFavoritesItems> = yield select(selectFavoritesItems)

  const { address } = action.payload
  const isFound: boolean = !!items[address]

  if (isFound) {
    return
  }

  const checksumAddres: Address = getAddressChecksum(address)

  const newFavorites: Favorites = {
    ...items,
    [checksumAddres]: { checksumAddres },
  }

  yield put(favorites.setItems(newFavorites))
}

function* onAddressViewClose(): Saga<void> {
  yield put(favorites.clean())
}

export function* favoritesRootSaga(): Saga<void> {
  yield takeEvery(favorites.EDIT, edit)
  yield takeEvery(favorites.REMOVE, remove)
  yield takeEvery(favorites.ADD_AUTO, addAuto)
  yield takeEvery(favorites.ADD_BY_USER, addByUser)
  yield takeEvery(favorites.ON_ADDRESS_VIEW_CLOSE, onAddressViewClose)
}
