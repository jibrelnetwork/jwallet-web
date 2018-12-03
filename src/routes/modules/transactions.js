// @flow

export const SYNC_START = '@@transactions/SYNC_START'
export const SYNC_STOP = '@@transactions/SYNC_STOP'
export const SYNC_ERROR = '@@transactions/SYNC_ERROR'
export const SYNC_CANCELLED = '@@transactions/SYNC_CANCELLED'

export const SET_ITEMS = '@@transactions/SET_ITEMS'

export const SET_IS_BLOCK_EXPLORER_ERROR = '@@transactions/SET_IS_BLOCK_EXPLORER_ERROR'

export const CHANGE_SEARCH_INPUT = '@@transactions/CHANGE_SEARCH_INPUT'
export const SET_IS_ONLY_PENDING = '@@transactions/SET_IS_ONLY_PENDING'

export function syncStart(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  currentBlock: ?BlockData,
  processingBlock: BlockData,
) {
  return {
    type: SYNC_START,
    payload: {
      requestQueue,
      currentBlock,
      processingBlock,
      ownerAddress,
      networkId,
    },
  }
}

export function syncStop() {
  return {
    type: SYNC_STOP,
  }
}

export function syncError(err: Error) {
  return {
    type: SYNC_ERROR,
    payload: err,
    error: true,
  }
}

export function syncCancelled() {
  return {
    type: SYNC_CANCELLED,
  }
}

export function setItems(
  networkId: NetworkId,
  owner: Address,
  asset: AssetAddress,
  items: Transactions,
) {
  return {
    type: SET_ITEMS,
    payload: {
      items,
      asset,
      owner,
      networkId,
    },
  }
}

export function setIsBlockExporerError(isBlockExplorerError: boolean) {
  return {
    type: SET_IS_BLOCK_EXPLORER_ERROR,
    payload: {
      isBlockExplorerError,
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
  ExtractReturn<typeof syncStart> |
  ExtractReturn<typeof syncStop> |
  ExtractReturn<typeof syncError> |
  ExtractReturn<typeof syncCancelled> |
  ExtractReturn<typeof setItems> |
  ExtractReturn<typeof setIsBlockExporerError> |
  ExtractReturn<typeof changeSearchInput> |
  ExtractReturn<typeof setIsOnlyPending>

const initialState: TransactionsState = {
  persist: {
    items: {},
  },
  searchQuery: '',
  isSyncing: false,
  isOnlyPending: false,
  isBlockExplorerError: false,
}

function transactions(
  state: TransactionsState = initialState,
  action: TransactionsAction,
): TransactionsState {
  switch (action.type) {
    case SYNC_START:
      return {
        ...state,
        isSyncing: true,
      }

    case SYNC_STOP:
      return {
        ...state,
        isSyncing: false,
      }

    case SET_ITEMS: {
      const {
        items,
        asset,
        owner,
        networkId,
      } = action.payload

      const transactionsByNetworkId = state.persist.items[networkId] || {}
      const transactionsByOwner = transactionsByNetworkId[owner] || {}
      const oldTransactions: Transactions = transactionsByOwner[asset] || {}

      const newTransactions: Transactions = Object
        .keys(items)
        .reduce((result: Transactions, hash: Hash): Transactions => {
          if (!result[hash]) {
            return {
              ...result,
              [hash]: items[hash],
            }
          }

          return {
            ...result,
            [hash]: {
              ...result[hash],
              ...items[hash],
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
              ...transactionsByNetworkId,
              [owner]: {
                ...transactionsByOwner,
                [asset]: newTransactions,
              },
            },
          },
        },
      }
    }

    case SET_IS_BLOCK_EXPLORER_ERROR:
      return {
        ...state,
        isBlockExplorerError: action.payload.isBlockExplorerError,
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
