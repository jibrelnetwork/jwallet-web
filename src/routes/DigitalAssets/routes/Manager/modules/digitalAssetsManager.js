// @flow

export const OPEN_VIEW = '@@digitalAssetsManager/OPEN_VIEW'
export const CLOSE_VIEW = '@@digitalAssetsManager/CLOSE_VIEW'

export const SET_SEARCH_QUERY = '@@digitalAssetsManager/SET_SEARCH_QUERY'

export const CLEAN = '@@digitalAssetsManager/CLEAN'

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

export type DigitalAssetsManagerActions = ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof setSearchQuery> |
  ExtractReturn<typeof clean>

const initialState: DigitalAssetManagerState = {
  searchQuery: '',
}

const digitalAssetsManager = (
  state: DigitalAssetManagerState = initialState,
  action: DigitalAssetsManagerActions,
): DigitalAssetManagerState => {
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

export default digitalAssetsManager
