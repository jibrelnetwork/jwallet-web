// @flow

export const SET_INITIAL_ITEMS = '@@digitalAssets/SET_INITIAL_ITEMS'
export const ADD_CUSTOM_ASSET = '@@digitalAssets/ADD_CUSTOM_ASSET'
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

export function addCustomAsset(address: Address, name: string, symbol: string, decimals: number) {
  return {
    type: ADD_CUSTOM_ASSET,
    payload: {
      address,
      name,
      symbol,
      decimals,
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

export function updateAsset(address: Address, name: string, symbol: string, decimals: number) {
  return {
    type: UPDATE_ASSET,
    payload: {
      address,
      name,
      symbol,
      decimals,
    },
  }
}

export type DigitalAssetsAction = ExtractReturn<typeof setInitialItems>
  | ExtractReturn<typeof addCustomAsset>
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
  action: DigitalAssetsAction,
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

    case ADD_CUSTOM_ASSET: {
      const {
        address,
        name,
        symbol,
        decimals,
      } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...state.persist.items,
            [address]: {
              address,
              name,
              symbol,
              decimals,
              isCustom: true,
              isActive: true,
            },
          },
        },
      }
    }

    case UPDATE_ASSET: {
      const {
        address,
        name,
        symbol,
        decimals,
      } = action.payload

      const {
        persist,
      } = state

      return {
        ...state,
        persist: {
          ...persist,
          items: {
            ...persist.items,
            [address]: {
              ...persist.items[address],
              name,
              symbol,
              decimals,
            },
          },
        },
      }
    }

    default:
      return state
  }
}

export default digitalAssets
