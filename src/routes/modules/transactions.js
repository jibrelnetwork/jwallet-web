// @flow

export const SYNC_START = '@@transactions/SYNC_START'
export const SYNC_STOP = '@@transactions/SYNC_STOP'
export const SYNC_ERROR = '@@transactions/SYNC_ERROR'

export const SET_ITEMS = '@@transactions/SET_ITEMS'

export const SET_IS_LOADING = '@@transactions/SET_IS_LOADING'
export const SET_IS_BLOCK_EXPLORER_ERROR = '@@transactions/SET_IS_BLOCK_EXPLORER_ERROR'

export const CLEAN = '@@transactions/CLEAN'

export function syncStart() {
  return {
    type: SYNC_START,
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

export function setItems(
  networkId: NetworkId,
  owner: Address,
  assetAddress: AssetAddress,
  items: Transactions,
) {
  return {
    type: SET_ITEMS,
    payload: {
      items,
      owner,
      networkId,
      assetAddress,
    },
  }
}

export function setIsLoading(isLoading: boolean) {
  return {
    type: SET_IS_LOADING,
    payload: {
      isLoading,
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

export function clean() {
  return {
    type: CLEAN,
  }
}

type TransactionsAction =
  ExtractReturn<typeof syncStart> |
  ExtractReturn<typeof syncStop> |
  ExtractReturn<typeof syncError> |
  ExtractReturn<typeof setItems> |
  ExtractReturn<typeof setIsLoading> |
  ExtractReturn<typeof setIsBlockExporerError> |
  ExtractReturn<typeof clean>

const initialState: TransactionsState = {
  persist: {
    items: {},
  },
  isLoading: false,
  isSyncing: false,
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
        owner,
        networkId,
        assetAddress,
      } = action.payload

      const txHashes: Hashes = Object.keys(items)
      const oldTransactions: Transactions = state.persist.items[networkId][owner][assetAddress]

      const newTransactions: Transactions = txHashes.reduce((
        result: Transactions,
        hash: Hash,
      ): Transactions => {
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
              ...state.persist.items[networkId],
              [owner]: {
                ...state.persist.items[networkId][owner],
                [assetAddress]: newTransactions,
              },
            },
          },
        },
      }
    }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }

    case SET_IS_BLOCK_EXPLORER_ERROR:
      return {
        ...state,
        isBlockExplorerError: action.payload.isBlockExplorerError,
      }

    case CLEAN:
      return {
        ...initialState,
        persist: state.persist,
      }

    default:
      return state
  }
}

export default transactions
