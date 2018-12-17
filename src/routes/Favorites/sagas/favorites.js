// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import { selectFavoritesItems } from 'store/selectors/favorites'

import * as favorites from '../modules/favorites'

function* checkFavoriteDataValid(name: string, comment: string, address?: string): Saga<void> {
  const isNameInvalid: boolean = /[^a-z0-9 ]/ig.test(name)
  const isCommentInvalid: boolean = /[^a-z0-9 ]/ig.test(comment)
  const isAddressInvalid: boolean = !!address && utils.checkAddressValid(address)

  if (isAddressInvalid) {
    yield put(favorites.setFormFieldError('address', 'Please input valid address'))
  }

  if (isNameInvalid) {
    yield put(favorites.setFormFieldError('name', 'Please input valid name for address'))
  }

  if (isCommentInvalid) {
    yield put(favorites.setFormFieldError('comment', 'Please input valid comment for address'))
  }

  if (isNameInvalid || isAddressInvalid || isCommentInvalid) {
    return false
  }

  return true
}

function getFavoriteData(
  address: string,
  name: string,
  comment: string,
  isAddedByUser: boolean,
): Favorite {
  return {
    address,
    isAddedByUser,
    name: name.trim(),
    comment: comment.trim(),
  }
}

function* edit(action: ExtractReturn<typeof favorites.edit>): Saga<void> {
  const items: ExtractReturn<typeof selectFavoritesItems> = yield select(selectFavoritesItems)

  const {
    name,
    address,
    comment,
  } = action.payload

  const isValid: boolean = yield checkFavoriteDataValid(name, comment)

  if (!isValid) {
    return
  }

  const newFavorites: Favorites = {
    ...items,
    [address]: getFavoriteData(address, name, comment, true),
  }

  yield put(favorites.setItems(newFavorites))
}

function* remove(action: ExtractReturn<typeof favorites.remove>): Saga<void> {
  const items: ExtractReturn<typeof selectFavoritesItems> = yield select(selectFavoritesItems)

  const { address } = action.payload
  const isFound: boolean = !!items[address]

  if (isFound) {
    return
  }

  const favoriteAddresses: OwnerAddress[] = Object.keys(items)

  const newFavorites: Favorites = favoriteAddresses
    .reduce((result: Favorites, i: OwnerAddress): Favorites => (i === address) ? result : {
      ...result,
      [address]: items[i],
    }, {})

  yield put(favorites.setItems(newFavorites))
}

function* addByUser(action: ExtractReturn<typeof favorites.addByUser>): Saga<void> {
  const items: ExtractReturn<typeof selectFavoritesItems> = yield select(selectFavoritesItems)

  const {
    name,
    address,
    comment,
  } = action.payload

  const isValid: boolean = yield checkFavoriteDataValid(name, comment, address)

  if (!isValid) {
    return
  }

  const foundItem: ?Favorite = items[address]

  if (foundItem && foundItem.isAddedByUser) {
    yield put(favorites.setFormFieldError('address', 'Favorite with this address already exists'))

    return
  }

  const newFavorites: Favorites = {
    ...items,
    [address]: getFavoriteData(address, name, comment, true),
  }

  yield put(favorites.setItems(newFavorites))
}

function* addAuto(action: ExtractReturn<typeof favorites.addAuto>): Saga<void> {
  const items: ExtractReturn<typeof selectFavoritesItems> = yield select(selectFavoritesItems)

  const { address } = action.payload
  const isFound: boolean = !!items[address]

  if (isFound) {
    return
  }

  const newFavorites: Favorites = {
    ...items,
    [address]: { address },
  }

  yield put(favorites.setItems(newFavorites))
}

export function* favoritesRootSaga(): Saga<void> {
  yield takeEvery(favorites.EDIT, edit)
  yield takeEvery(favorites.REMOVE, remove)
  yield takeEvery(favorites.ADD_AUTO, addAuto)
  yield takeEvery(favorites.ADD_BY_USER, addByUser)
}
