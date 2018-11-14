// @flow

export const OPEN_VIEW = '@@digitalAssetsGrid/OPEN_VIEW'
export const CLOSE_VIEW = '@@digitalAssetsGrid/CLOSE_VIEW'

export const SET_SEARCH_QUERY = '@@digitalAssetsGrid/SET_SEARCH_QUERY'

export const SET_FILTER_SORT_BY_NAME = '@@digitalAssetsGrid/SET_FILTER_SORT_BY_NAME'
export const SET_FILTER_SORT_BY_BALANCE = '@@digitalAssetsGrid/SET_FILTER_SORT_BY_BALANCE'
export const SET_FILTER_HIDE_ZERO_BALANCE = '@@digitalAssetsGrid/SET_FILTER_HIDE_ZERO_BALANCE'

export const SORT_BY_NAME_CLICK = '@@digitalAssetsGrid/SORT_BY_NAME_CLICK'
export const SORT_BY_BALANCE_CLICK = '@@digitalAssetsGrid/SORT_BY_BALANCE_CLICK'

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

export function setSortByName(direction: SortDirection) {
  return {
    type: SET_FILTER_SORT_BY_NAME,
    payload: {
      direction,
    },
  }
}

export function sortByNameClick() {
  return {
    type: SORT_BY_NAME_CLICK,
  }
}

export function setSortByBalance(direction: SortDirection) {
  return {
    type: SET_FILTER_SORT_BY_BALANCE,
    payload: {
      direction,
    },
  }
}

export function sortByBalanceClick() {
  return {
    type: SORT_BY_BALANCE_CLICK,
  }
}

export function setHideZeroBalance(isActive: boolean) {
  return {
    type: SET_FILTER_HIDE_ZERO_BALANCE,
    payload: {
      isActive,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type DigitalAssetsGridAction = ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof setSearchQuery> |
  ExtractReturn<typeof setSortByName> |
  ExtractReturn<typeof sortByNameClick> |
  ExtractReturn<typeof setSortByBalance> |
  ExtractReturn<typeof sortByBalanceClick> |
  ExtractReturn<typeof setHideZeroBalance>

const initialState: DigitalAssetsGridState = {
  filter: {
    sortBy: 'name',
    sortByNameDirection: 'asc',
    sortByBalanceDirection: 'asc',
    isHideZeroBalance: false,
  },
  searchQuery: '',
}

const digitalAssetsGrid = (
  state: DigitalAssetsGridState = initialState,
  action: DigitalAssetsGridAction,
): DigitalAssetsGridState => {
  switch (action.type) {
    case SET_SEARCH_QUERY: {
      const { query } = action.payload

      return {
        ...state,
        searchQuery: query,
      }
    }

    case SET_FILTER_SORT_BY_NAME: {
      const { direction } = action.payload

      return {
        ...state,
        filter: {
          ...state.filter,
          sortByNameDirection: direction,
          sortBy: 'name',
        },
      }
    }

    case SET_FILTER_SORT_BY_BALANCE: {
      const { direction } = action.payload

      return {
        ...state,
        filter: {
          ...state.filter,
          sortByBalanceDirection: direction,
          sortBy: 'balance',
        },
      }
    }

    case SET_FILTER_HIDE_ZERO_BALANCE: {
      const { isActive } = action.payload

      return {
        ...state,
        filter: {
          ...state.filter,
          isHideZeroBalance: isActive,
        },
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
