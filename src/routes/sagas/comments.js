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

  if (!value) {
    yield put(comments.remove(id))

    return
  }

  const isFound: boolean = !!items[id]

  if (!isFound) {
    return
  }

  const newComments: Comments = {
    ...items,
    [id]: value,
  }

  yield put(comments.setItems(newComments))
}

function* remove(action: ExtractReturn<typeof comments.remove>): Saga<void> {
  const items: ExtractReturn<typeof selectCommentsItems> = yield select(selectCommentsItems)

  const { id } = action.payload
  const isFound: boolean = !!items[id]

  if (!isFound) {
    return
  }

  const commentIds: CommentId[] = Object.keys(items)

  const newComments: Comments = commentIds
    .reduce((result: Comments, commentId: CommentId): Comments => (commentId === id) ? result : {
      ...result,
      [commentId]: items[commentId],
    }, {})

  yield put(comments.setItems(newComments))
}

function* add(action: ExtractReturn<typeof comments.add>): Saga<void> {
  const items: ExtractReturn<typeof selectCommentsItems> = yield select(selectCommentsItems)

  const {
    id,
    value,
  } = action.payload

  const isFound: boolean = !!items[id]

  if (isFound) {
    return
  }

  const newComments: Comments = {
    ...items,
    [id]: value,
  }

  yield put(comments.setItems(newComments))
}

export function* commentsRootSaga(): Saga<void> {
  yield takeEvery(comments.ADD, add)
  yield takeEvery(comments.EDIT, edit)
  yield takeEvery(comments.REMOVE, remove)
}
