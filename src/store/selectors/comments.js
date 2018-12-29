// @flow

export function selectComments(state: AppState): CommentsState {
  return state.comments
}

export function selectCommentsPersist(state: AppState): CommentsPersist {
  const comments: CommentsState = selectComments(state)

  return comments.persist
}

export function selectCommentsItems(state: AppState): Comments {
  const commentsPersist: CommentsPersist = selectCommentsPersist(state)

  return commentsPersist.items
}
