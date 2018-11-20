// @flow

import update from 'react-addons-update'

export const SYNC_START = '@@transactions/SYNC_START'
export const SYNC_STOP = '@@transactions/SYNC_STOP'
export const SYNC_ERROR = '@@transactions/SYNC_ERROR'

export const SET_ITEMS = '@@transactions/SET_ITEMS'

export const SET_IS_LOADING = '@@transactions/SET_IS_LOADING'
export const SET_IS_BLOCK_EXPLORER_ERROR = '@@transactions/SET_IS_BLOCK_EXPLORER_ERROR'

export function syncStart(
  requestQueue: Channel,
  networkId: NetworkId,
  owner: Address,
  currentBlock: ?BlockInfo,
  processingBlock: BlockInfo,
) {
  return {
    type: SYNC_START,
    payload: {
      requestQueue,
      currentBlock,
      processingBlock,
      owner,
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

type TransactionsAction =
  ExtractReturn<typeof syncStart> |
  ExtractReturn<typeof syncStop> |
  ExtractReturn<typeof syncError> |
  ExtractReturn<typeof setItems> |
  ExtractReturn<typeof setIsLoading> |
  ExtractReturn<typeof setIsBlockExporerError>

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
        asset,
        owner,
        networkId,
      } = action.payload

      const oldTransactions: Transactions = state.persist.items[networkId][owner][asset]

      const newTransactions: Transactions = Object
        .keys(items)
        .reduce((result: Transactions, hash: Hash): Transactions => update(result, {
          [hash]: {
            $set: !result[hash] ? items[hash] : update(result[hash], {
              $merge: items[hash],
            }),
          },
        }), oldTransactions)

      return update(state, {
        persist: {
          items: {
            [networkId]: {
              [owner]: {
                [asset]: {
                  $set: newTransactions,
                },
              },
            },
          },
        },
      })
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

    default:
      return state
  }
}

export default transactions
