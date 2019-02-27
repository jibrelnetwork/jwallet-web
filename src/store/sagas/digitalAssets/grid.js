// @flow

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import { selectDigitalAssetsGridFilters } from 'store/selectors/digitalAssets'

import {
  setSortByName,
  setSortByBalance,
  SORT_BY_NAME_CLICK,
  SORT_BY_BALANCE_CLICK,
} from 'store/modules/digitalAssetsGrid'

function toggleSortDirection(currentDirection: SortDirection): SortDirection {
  return (currentDirection === 'asc') ? 'desc' : 'asc'
}

function* sortByNameClick(): Saga<void> {
  const {
    sortBy,
    sortByNameDirection,
  }: DigitalAssetsFilterOptions = yield select(selectDigitalAssetsGridFilters)

  if (sortBy === 'name') {
    yield put(setSortByName(toggleSortDirection(sortByNameDirection)))
  } else {
    yield put(setSortByName(sortByNameDirection))
  }
}

function* sortByBalanceClick(): Saga<void> {
  const {
    sortBy,
    sortByBalanceDirection,
  }: DigitalAssetsFilterOptions = yield select(selectDigitalAssetsGridFilters)

  if (sortBy === 'balance') {
    yield put(setSortByBalance(toggleSortDirection(sortByBalanceDirection)))
  } else {
    yield put(setSortByBalance(sortByBalanceDirection))
  }
}

export function* gridRootSaga(): Saga<void> {
  yield takeEvery(SORT_BY_NAME_CLICK, sortByNameClick)
  yield takeEvery(SORT_BY_BALANCE_CLICK, sortByBalanceClick)
}
