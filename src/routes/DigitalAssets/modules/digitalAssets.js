// @flow

/* eslint-disable max-len */
export const OPEN_VIEW: '@@digitalAssets/OPEN_VIEW' = '@@digitalAssets/OPEN_VIEW'
export const CLOSE_VIEW: '@@digitalAssets/CLOSE_VIEW' = '@@digitalAssets/CLOSE_VIEW'

export const SET_INITIAL_ITEMS: '@@digitalAssets/SET_INITIAL_ITEMS' = '@@digitalAssets/SET_INITIAL_ITEMS'
export const ADD_ASSET: '@@digitalAssets/ADD_ASSET' = '@@digitalAssets/ADD_ASSET'
export const REMOVE_ASSET: '@@digitalAssets/REMOVE_ASSET' = '@@digitalAssets/REMOVE_ASSET'
export const UPDATE_ASSET: '@@digitalAssets/UPDATE_ASSET' = '@@digitalAssets/UPDATE_ASSET'
export const SET_SEARCH_QUERY: '@@digitalAssets/SET_SEARCH_QUERY' = '@@digitalAssets/SET_SEARCH_QUERY'
/* eslint-enable max-len */

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

export function setInitialItems(items: DigitalAssets) {
  return {
    type: SET_INITIAL_ITEMS,
    payload: {
      items,
    },
  }
}

export function addAsset(item: DigitalAsset) {
  return {
    type: ADD_ASSET,
    payload: {
      item,
    },
  }
}

export function removeAsset(assetAddress: Address) {
  return {
    type: REMOVE_ASSET,
    payload: {
      address: assetAddress,
    },
  }
}

export function updateAsset(item: DigitalAsset) {
  return {
    type: UPDATE_ASSET,
    payload: {
      item,
    },
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

type DigitalAssetsActions = ExtractReturn<typeof setInitialItems>
  | ExtractReturn<typeof addAsset>
  // | ExtractReturn<typeof removeAsset>
  // | ExtractReturn<typeof updateAsset>
  | ExtractReturn<typeof setSearchQuery>

const initialState: DigitalAssetsState = {
  persist: {
    items: {},
    balances: {},
  },
  filter: {
    sortBy: 'name',
    sortByNameOrder: 'asc',
    sortByBalaceOrder: 'asc',
    myAssetsFirst: false,
    hideZeroBalance: false,
  },
  searchQuery: '',
}

const digitalAssets = (
  state: DigitalAssetsState = initialState,
  action: DigitalAssetsActions,
): DigitalAssetsState => {
  switch (action.type) {
    case SET_INITIAL_ITEMS: {
      const { items } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items,
        },
      }
    }

    case ADD_ASSET: {
      const { item } = action.payload
      const { address } = item

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...state.persist.items,
            [address]: item,
          },
        },
      }
    }

    case SET_SEARCH_QUERY: {
      const { query } = action.payload

      return {
        ...state,
        searchQuery: query,
      }
    }

    default:
      return state
  }
}

export default digitalAssets
