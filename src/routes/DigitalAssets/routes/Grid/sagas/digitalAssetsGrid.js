// @flow

import { select, put, takeEvery } from 'redux-saga/effects'
import { selectDigitalAssetsGridFilters } from 'store/stateSelectors'

import {
  setSortByName,
  setSortByBalance,
  SORT_BY_NAME_CLICK,
  SORT_BY_BALANCE_CLICK,
} from '../modules/digitalAssetsGrid'

function toggleSortOrder(currentOrder: SortOrder): SortOrder {
  return (currentOrder === 'asc') ? 'desc' : 'asc'
}

function* sortByNameClick(): Saga<void> {
  const {
    sortByNameOrder,
    sortBy,
  }: DigitalAssetsFilterType = yield select(selectDigitalAssetsGridFilters)

  if (sortBy === 'name') {
    yield put(setSortByName(toggleSortOrder(sortByNameOrder)))
  } else {
    yield put(setSortByName(sortByNameOrder))
  }
}

function* sortByBalanceClick(): Saga<void> {
  const {
    sortByBalanceOrder,
    sortBy,
  }: DigitalAssetsFilterType = yield select(selectDigitalAssetsGridFilters)

  if (sortBy === 'balance') {
    yield put(setSortByBalance(toggleSortOrder(sortByBalanceOrder)))
  } else {
    yield put(setSortByBalance(sortByBalanceOrder))
  }
}

export function* digitalAssetsGridRootSaga(): Saga<void> {
  yield takeEvery(SORT_BY_NAME_CLICK, sortByNameClick)
  yield takeEvery(SORT_BY_BALANCE_CLICK, sortByBalanceClick)
}
