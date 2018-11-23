// @flow

// @private
export const SET_INITIAL_ITEMS = '@@digitalAssets/SET_INITIAL_ITEMS'
export const UPDATE_ASSET = '@@digitalAssets/UPDATE_ASSET'
export const DELETE_CUSTOM_ASSET = '@@digitalAssets/DELETE_CUSTOM_ASSET'
export const ADD_CUSTOM_ASSET = '@@digitalAssets/ADD_CUSTOM_ASSET'

// @public
export const SET_ASSET_IS_ACTIVE = '@@digitalAssets/SET_ASSET_IS_ACTIVE'
export const DELETE_ASSET_REQUEST = '@@digitalAssets/DELETE_ASSET_REQUEST'
export const DELETE_ASSET_SUCCESS = '@@digitalAssets/DELETE_ASSET_SUCCESS'
export const ADD_CUSTOM_ASSET_SUCCESS = '@@digitalAssets/ADD_CUSTOM_ASSET_SUCCESS'

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

export function addCustomAssetSuccess(address: Address) {
  return {
    type: ADD_CUSTOM_ASSET_SUCCESS,
    payload: {
      address,
    },
  }
}

export function setAssetIsActive(assetAddress: Address, isActive: boolean) {
  return {
    type: SET_ASSET_IS_ACTIVE,
    payload: {
      address: assetAddress,
      isActive,
    },
  }
}

// @public
export function deleteCustomAsset(assetAddress: Address) {
  return {
    type: DELETE_CUSTOM_ASSET,
    payload: {
      assetAddress,
    },
  }
}

export function deleteAssetRequest(assetAddress: Address) {
  return {
    type: DELETE_ASSET_REQUEST,
    payload: {
      address: assetAddress,
    },
  }
}

export function deleteAssetSuccess(assetAddress: Address) {
  return {
    type: DELETE_ASSET_SUCCESS,
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
  | ExtractReturn<typeof addCustomAssetSuccess>
  | ExtractReturn<typeof deleteCustomAsset>
  | ExtractReturn<typeof deleteAssetRequest>
  | ExtractReturn<typeof deleteAssetSuccess>
  | ExtractReturn<typeof updateAsset>
  | ExtractReturn<typeof setAssetIsActive>

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

    case SET_ASSET_IS_ACTIVE: {
      const {
        address,
        isActive,
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
              isActive,
            },
          },
        },
      }
    }

    case DELETE_ASSET_REQUEST: {
      const {
        address,
      } = action.payload

      const {
        persist,
      } = state

      const newItems = Object
        .keys(persist.items)
        .map(addr => persist.items[addr])
        .reduce((previous, current) => (current.address !== address) ? {
          ...previous,
          [current.address]: current,
        } : previous, {})

      return {
        ...state,
        persist: {
          ...persist,
          items: newItems,
        },
      }
    }

    default:
      return state
  }
}

export default digitalAssets
