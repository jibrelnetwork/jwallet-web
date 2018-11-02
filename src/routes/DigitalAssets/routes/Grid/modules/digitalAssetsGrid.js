// @flow

export const OPEN_VIEW = '@@digitalAssetsGrid/OPEN_VIEW'
export const CLOSE_VIEW = '@@digitalAssetsGrid/CLOSE_VIEW'

export const SET_SEARCH_QUERY = '@@digitalAssetsGrid/SET_SEARCH_QUERY'

export const CLEAN = '@@digitalAssetsGrid/CLEAN'

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

export type DigitalAssetsGridActions = ExtractReturn<typeof openView>
  | ExtractReturn<typeof closeView>
  | ExtractReturn<typeof setSearchQuery>

const initialState: DigitalAssetsGridState = {
  filter: {
    sortBy: 'name',
    sortByNameOrder: 'asc',
    sortByBalaceOrder: 'asc',
    myAssetsFirst: false,
    hideZeroBalance: false,
  },
  searchQuery: '',
}

const digitalAssetsGrid = (
  state: DigitalAssetsGridState = initialState,
  action: DigitalAssetsGridActions,
): DigitalAssetsGridState => {
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

export default digitalAssetsGrid
