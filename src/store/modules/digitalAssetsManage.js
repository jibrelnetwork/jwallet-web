// @flow

export const OPEN_VIEW = '@@digitalAssetsManage/OPEN_VIEW'
export const CLOSE_VIEW = '@@digitalAssetsManage/CLOSE_VIEW'

export const SET_SEARCH_QUERY = '@@digitalAssetsManage/SET_SEARCH_QUERY'

export const CLEAN = '@@digitalAssetsManage/CLEAN'

export function openView() {
  return {
    type: OPEN_VIEW,
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function setSearchQuery(query: string) {
  return {
    type: SET_SEARCH_QUERY,
    payload: {
      query,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type DigitalAssetsManageAction = ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof setSearchQuery> |
  ExtractReturn<typeof clean>

const initialState: DigitalAssetsManageState = {
  searchQuery: '',
}

const digitalAssetsManage = (
  state: DigitalAssetsManageState = initialState,
  action: DigitalAssetsManageAction,
): DigitalAssetsManageState => {
  switch (action.type) {
    case SET_SEARCH_QUERY: {
      const { query } = action.payload

      return {
        ...state,
        searchQuery: query,
      }
    }

    case CLEAN: {
      return {
        ...initialState,
      }
    }

    default:
      return state
  }
}

export default digitalAssetsManage
