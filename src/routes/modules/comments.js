// @flow

export const EDIT = '@@comments/EDIT'
export const SET_ITEMS = '@@comments/SET_ITEMS'

export function edit(id: CommentId, value: string) {
  return {
    type: EDIT,
    payload: {
      id,
      value,
    },
  }
}

export function setItems(items: Comments) {
  return {
    type: SET_ITEMS,
    payload: {
      items,
    },
  }
}

export type CommentsAction =
  ExtractReturn<typeof edit> |
  ExtractReturn<typeof setItems>

const initialState: CommentsState = {
  persist: {
    items: {},
  },
}

function comments(state: CommentsState = initialState, action: CommentsAction): CommentsState {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        persist: {
          ...state.persist,
          items: action.payload.items,
        },
      }

    default:
      return state
  }
}

export default comments
