// @flow

export const FETCH_BY_OWNER_REQUEST = '@@balances/FETCH_BY_OWNER_REQUEST'

export const INIT_ITEM_BY_ASSET = '@@balances/INIT_ITEM_BY_ASSET'
export const INIT_ITEMS_BY_BLOCK = '@@balances/INIT_ITEMS_BY_BLOCK'

export const FETCH_BY_ASSET_SUCCESS = '@@balances/FETCH_BY_ASSET_SUCCESS'
export const FETCH_BY_ASSET_ERROR = '@@balances/FETCH_BY_ASSET_ERROR'

export function fetchByOwnerRequest(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  blockNumber: number,
) {
  return {
    type: FETCH_BY_OWNER_REQUEST,
    payload: {
      requestQueue,
      networkId,
      ownerAddress,
      blockNumber,
    },
  }
}

export function initItemsByBlock(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  blockNumber: BlockNumber,
) {
  return {
    type: INIT_ITEMS_BY_BLOCK,
    payload: {
      networkId,
      blockNumber,
      ownerAddress,
    },
  }
}

export function initItemByAsset(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  blockNumber: BlockNumber,
  assetAddress: AssetAddress,
  isExistedIgnored?: boolean = false,
) {
  return {
    type: INIT_ITEM_BY_ASSET,
    payload: {
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
      isExistedIgnored,
    },
  }
}

export function fetchByAssetError(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  blockNumber: BlockNumber,
  assetAddress: AssetAddress,
) {
  return {
    type: FETCH_BY_ASSET_ERROR,
    payload: {
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
    },
  }
}

export function fetchByAssetSuccess(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  blockNumber: BlockNumber,
  assetAddress: AssetAddress,
  balance: string,
) {
  return {
    type: FETCH_BY_ASSET_SUCCESS,
    payload: {
      balance,
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
    },
  }
}

export type BalancesAction =
  ExtractReturn<typeof fetchByOwnerRequest> |
  ExtractReturn<typeof initItemsByBlock> |
  ExtractReturn<typeof initItemByAsset> |
  ExtractReturn<typeof fetchByAssetError> |
  ExtractReturn<typeof fetchByAssetSuccess>

const initialState: BalancesState = {
  persist: {
    items: {},
  },
}

function balances(state: BalancesState = initialState, action: BalancesAction): BalancesState {
  switch (action.type) {
    case FETCH_BY_OWNER_REQUEST: {
      const { items } = state.persist

      const {
        networkId,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: BalancesByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: ?BalancesByOwner = itemsByNetworkId[ownerAddress]

      return itemsByOwner ? state : {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: null,
            },
          },
        },
      }
    }

    case INIT_ITEMS_BY_BLOCK: {
      const { items } = state.persist

      const {
        networkId,
        ownerAddress,
        blockNumber,
      } = action.payload

      const itemsByNetworkId: BalancesByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: BalancesByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByBlock: ?Balances = itemsByOwner[blockNumber]

      return itemsByBlock ? state : {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [blockNumber]: {},
              },
            },
          },
        },
      }
    }

    case INIT_ITEM_BY_ASSET: {
      const { items } = state.persist

      const {
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
        isExistedIgnored,
      } = action.payload

      const itemsByNetworkId: BalancesByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: BalancesByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByBlock: Balances = itemsByOwner[blockNumber] || {}
      const itemByAsset: ?Balance = itemsByBlock[assetAddress]

      return (itemByAsset && !isExistedIgnored) ? state : {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [blockNumber]: {
                  ...itemsByBlock,
                  [assetAddress]: null,
                },
              },
            },
          },
        },
      }
    }

    case FETCH_BY_ASSET_SUCCESS: {
      const {
        balance,
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: BalancesByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: BalancesByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByBlock: Balances = itemsByOwner[blockNumber] || {}

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...state.persist.items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [blockNumber]: {
                  ...itemsByBlock,
                  [assetAddress]: {
                    value: balance,
                  },
                },
              },
            },
          },
        },
      }
    }

    case FETCH_BY_ASSET_ERROR: {
      const { items } = state.persist

      const {
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: BalancesByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: BalancesByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByBlock: Balances = itemsByOwner[blockNumber] || {}

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [blockNumber]: {
                  ...itemsByBlock,
                  [assetAddress]: {
                    isError: true,
                  },
                },
              },
            },
          },
        },
      }
    }

    default:
      return state
  }
}

export default balances
