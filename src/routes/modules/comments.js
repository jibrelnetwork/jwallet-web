// @flow

export const ADD = '@@comments/ADD'
export const EDIT = '@@comments/EDIT'
export const REMOVE = '@@comments/REMOVE'

export const SET_ITEMS = '@@comments/SET_ITEMS'
export const SET_IS_LOADING = '@@comments/SET_IS_LOADING'

export const CLEAN = '@@comments/CLEAN'

export function add(id: string, value: string) {
  return {
    type: ADD,
    payload: {
      id,
      value,
    },
  }
}

export function edit(id: CommentId, value: string) {
  return {
    type: EDIT,
    payload: {
      id,
      value,
    },
  }
}

export function remove(id: CommentId) {
  return {
    type: REMOVE,
    payload: {
      id,
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

export function setIsLoading(isLoading: boolean) {
  return {
    type: SET_IS_LOADING,
    payload: {
      isLoading,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type CommentsAction =
  ExtractReturn<typeof add> |
  ExtractReturn<typeof edit> |
  ExtractReturn<typeof remove> |
  ExtractReturn<typeof setItems> |
  ExtractReturn<typeof setIsLoading> |
  ExtractReturn<typeof clean>

const initialState: CommentsState = {
  persist: {
    items: {},
  },
  isLoading: false,
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

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }

    case CLEAN:
      return {
        ...initialState,
        persist: state.persist,
      }

    default:
      return state
  }
}

export default comments
