// @flow

export const FETCH_BY_OWNER_REQUEST = '@@transactions/FETCH_BY_OWNER_REQUEST'

export const RESYNC_TRANSACTIONS_START = '@@transactions/RESYNC_TRANSACTIONS_START'
export const RESYNC_TRANSACTIONS_STOP = '@@transactions/RESYNC_TRANSACTIONS_STOP'

export const INIT_ITEMS_BY_ASSET = '@@transactions/INIT_ITEMS_BY_ASSET'
export const INIT_ITEMS_BY_BLOCK = '@@transactions/INIT_ITEMS_BY_BLOCK'

export const FETCH_BY_BLOCK_SUCCESS = '@@transactions/FETCH_BY_BLOCK_SUCCESS'
export const FETCH_BY_BLOCK_ERROR = '@@transactions/FETCH_BY_BLOCK_ERROR'

export const UPDATE_TRANSACTION_DATA = '@@transactions/UPDATE_TRANSACTION_DATA'

export const CHANGE_SEARCH_INPUT = '@@transactions/CHANGE_SEARCH_INPUT'
export const SET_IS_ONLY_PENDING = '@@transactions/SET_IS_ONLY_PENDING'

type UpdateTransactionData = {|
  +data?: TransactionData,
  +blockData?: TransactionBlockData,
  +receiptData?: TransactionReceiptData,
|}

export function fetchByOwnerRequest(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  fromBlock: number,
  toBlock: number,
) {
  return {
    type: FETCH_BY_OWNER_REQUEST,
    payload: {
      requestQueue,
      networkId,
      ownerAddress,
      toBlock,
      fromBlock,
    },
  }
}

export function resyncTransactionsStart(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  toBlock: number,
) {
  return {
    type: RESYNC_TRANSACTIONS_START,
    payload: {
      requestQueue,
      networkId,
      ownerAddress,
      toBlock,
    },
  }
}

export function resyncTransactionsStop() {
  return {
    type: RESYNC_TRANSACTIONS_STOP,
  }
}

export function initItemsByAsset(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
) {
  return {
    type: INIT_ITEMS_BY_ASSET,
    payload: {
      networkId,
      assetAddress,
      ownerAddress,
    },
  }
}

export function initItemsByBlock(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
) {
  return {
    type: INIT_ITEMS_BY_BLOCK,
    payload: {
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
    },
  }
}

export function fetchByBlockError(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
) {
  return {
    type: FETCH_BY_BLOCK_ERROR,
    payload: {
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
    },
  }
}

export function fetchByBlockSuccess(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
  items: Transactions,
) {
  return {
    type: FETCH_BY_BLOCK_SUCCESS,
    payload: {
      items,
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
    },
  }
}

export function updateTransactionData(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
  transactionId: TransactionId,
  updateData: UpdateTransactionData,
) {
  return {
    type: UPDATE_TRANSACTION_DATA,
    payload: {
      updateData,
      networkId,
      blockNumber,
      assetAddress,
      ownerAddress,
      transactionId,
    },
  }
}

export function changeSearchInput(searchQuery: string) {
  return {
    type: CHANGE_SEARCH_INPUT,
    payload: {
      searchQuery,
    },
  }
}

export function setIsOnlyPending(isOnlyPending: boolean) {
  return {
    type: SET_IS_ONLY_PENDING,
    payload: {
      isOnlyPending,
    },
  }
}

type TransactionsAction =
  ExtractReturn<typeof fetchByOwnerRequest> |
  ExtractReturn<typeof initItemsByAsset> |
  ExtractReturn<typeof initItemsByBlock> |
  ExtractReturn<typeof fetchByBlockSuccess> |
  ExtractReturn<typeof fetchByBlockError> |
  ExtractReturn<typeof updateTransactionData> |
  ExtractReturn<typeof changeSearchInput> |
  ExtractReturn<typeof setIsOnlyPending>

const initialState: TransactionsState = {
  persist: {
    items: {},
  },
  searchQuery: '',
  isOnlyPending: false,
  isConnectionError: false,
}

function transactions(
  state: TransactionsState = initialState,
  action: TransactionsAction,
): TransactionsState {
  switch (action.type) {
    case FETCH_BY_OWNER_REQUEST: {
      const { items } = state.persist

      const {
        networkId,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: ?TransactionsByOwner = itemsByNetworkId[ownerAddress]

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

    case INIT_ITEMS_BY_ASSET: {
      const { items } = state.persist

      const {
        networkId,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: ?TransactionsByAssetAddress = itemsByOwner[assetAddress]

      return itemsByAsset ? state : {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [networkId]: {
              ...itemsByNetworkId,
              [ownerAddress]: {
                ...itemsByOwner,
                [assetAddress]: null,
              },
            },
          },
        },
      }
    }

    case INIT_ITEMS_BY_BLOCK: {
      const { items } = state.persist

      const {
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: TransactionsByAssetAddress = itemsByOwner[assetAddress] || {}
      const itemsByBlock: ?TransactionsByBlockNumber = itemsByAsset[blockNumber]

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
                [assetAddress]: {
                  ...itemsByAsset,
                  [blockNumber]: {},
                },
              },
            },
          },
        },
      }
    }

    case FETCH_BY_BLOCK_SUCCESS: {
      const {
        items,
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: TransactionsByAssetAddress = itemsByOwner[assetAddress] || {}

      const itemsByBlock: TransactionsByBlockNumber = itemsByAsset[blockNumber] || {
        items: {},
      }

      const oldTransactions: Transactions = itemsByBlock.items || {}

      const newTransactions: Transactions = Object
        .keys(items)
        .reduce((result: Transactions, id: TransactionId): Transactions => {
          if (!result[id]) {
            return {
              ...result,
              [id]: items[id],
            }
          }

          return {
            ...result,
            [id]: {
              ...result[id],
              ...items[id],
            },
          }
        }, oldTransactions)

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
                [assetAddress]: {
                  ...itemsByAsset,
                  [blockNumber]: {
                    ...itemsByBlock,
                    items: newTransactions,
                  },
                },
              },
            },
          },
        },
      }
    }

    case UPDATE_TRANSACTION_DATA: {
      const {
        updateData,
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
        transactionId,
      } = action.payload

      const { items } = state.persist
      const itemsByNetworkId: TransactionsByNetworkId = items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: TransactionsByAssetAddress = itemsByOwner[assetAddress] || {}

      const itemsByBlock: TransactionsByBlockNumber = itemsByAsset[blockNumber] || {
        items: {},
      }

      const oldTransactions: Transactions = itemsByBlock.items || {}

      const newTransactions: Transactions = Object
        .keys(oldTransactions)
        .reduce((result: Transactions, id: TransactionId): Transactions => {
          if (id !== transactionId) {
            return result
          }

          return {
            ...result,
            [id]: {
              ...result[id],
              ...updateData,
            },
          }
        }, oldTransactions)

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
                [assetAddress]: {
                  ...itemsByAsset,
                  [blockNumber]: {
                    ...itemsByBlock,
                    items: newTransactions,
                  },
                },
              },
            },
          },
        },
      }
    }

    case FETCH_BY_BLOCK_ERROR: {
      const { items } = state.persist

      const {
        networkId,
        blockNumber,
        assetAddress,
        ownerAddress,
      } = action.payload

      const itemsByNetworkId: TransactionsByNetworkId = state.persist.items[networkId] || {}
      const itemsByOwner: TransactionsByOwner = itemsByNetworkId[ownerAddress] || {}
      const itemsByAsset: TransactionsByAssetAddress = itemsByOwner[assetAddress] || {}

      const itemsByBlock: TransactionsByBlockNumber = itemsByAsset[blockNumber] || {
        items: {},
      }

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
                [assetAddress]: {
                  ...itemsByAsset,
                  [blockNumber]: {
                    ...itemsByBlock,
                    isError: true,
                  },
                },
              },
            },
          },
        },
      }
    }

    case CHANGE_SEARCH_INPUT:
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      }

    case SET_IS_ONLY_PENDING:
      return {
        ...state,
        isOnlyPending: action.payload.isOnlyPending,
      }

    default:
      return state
  }
}

export default transactions
