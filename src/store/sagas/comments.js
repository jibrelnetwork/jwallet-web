// @flow

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import { selectCommentsItems } from 'store/selectors/comments'

import * as comments from '../modules/comments'

function* edit(action: ExtractReturn<typeof comments.edit>): Saga<void> {
  const items: ExtractReturn<typeof selectCommentsItems> = yield select(selectCommentsItems)

  const {
    id,
    value,
  } = action.payload

  const newComments: Comments = {
    ...items,
    [id]: value.trim(),
  }

  yield put(comments.setItems(newComments))
}

export function* commentsRootSaga(): Saga<void> {
  yield takeEvery(comments.EDIT, edit)
}
