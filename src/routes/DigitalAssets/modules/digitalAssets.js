// @flow

export const SET_INITIAL_ITEMS = '@@digitalAssets/SET_INITIAL_ITEMS'
export const ADD_ASSET = '@@digitalAssets/ADD_ASSET'
export const REMOVE_ASSET = '@@digitalAssets/REMOVE_ASSET'
export const UPDATE_ASSET = '@@digitalAssets/UPDATE_ASSET'

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

export type DigitalAssetsActions = ExtractReturn<typeof setInitialItems>
  | ExtractReturn<typeof addAsset>
  | ExtractReturn<typeof removeAsset>
  | ExtractReturn<typeof updateAsset>

const initialState: DigitalAssetsState = {
  persist: {
    items: {},
    balances: {},
  },
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

    default:
      return state
  }
}

export default digitalAssets
