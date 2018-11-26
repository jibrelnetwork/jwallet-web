// @flow

export const SYNC_START = '@@transactions/SYNC_START'
export const SYNC_STOP = '@@transactions/SYNC_STOP'
export const SYNC_ERROR = '@@transactions/SYNC_ERROR'

export const SET_ITEMS = '@@transactions/SET_ITEMS'

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
  ExtractReturn<typeof setIsBlockExporerError>

const initialState: TransactionsState = {
  persist: {
    items: {},
  },
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

    default:
      return state
  }
}

export default transactions
