// @flow

export const SYNC_START = '@@blocks/SYNC_START'
export const SYNC_STOP = '@@blocks/SYNC_STOP'
export const SYNC_RESTART = '@@blocks/SYNC_RESTART'

export const SET_LATEST_BLOCK = '@@blocks/SET_LATEST_BLOCK'
export const SET_PROCESSING_BLOCK = '@@blocks/SET_PROCESSING_BLOCK'
export const SET_CURRENT_BLOCK = '@@blocks/SET_CURRENT_BLOCK'

export const NODE_FORKED = '@@blocks/NODE_FORKED'

export const LATEST_BLOCK_SYNC_STOP = '@@blocks/LATEST_BLOCK_SYNC_STOP'
export const LATEST_BLOCK_SYNC_ERROR = '@@blocks/LATEST_BLOCK_SYNC_ERROR'

export const PROCESS_QUEUE_ERROR = '@@blocks/PROCESS_QUEUE_ERROR'

export const SET_IS_TRANSACTIONS_LOADING = '@@blocks/SET_IS_TRANSACTIONS_LOADING'
export const SET_IS_TRANSACTIONS_FETCHED = '@@blocks/SET_IS_TRANSACTIONS_FETCHED'

export const SET_IS_CONNECTION_ERROR = '@@blocks/SET_IS_CONNECTION_ERROR'

export const SET_INITIAL_BLOCK_NUMBER = '@@blocks/SET_INITIAL_BLOCK_NUMBER'

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

export function syncRestart() {
  return {
    type: SYNC_RESTART,
  }
}

export function setLatestBlock(networkId: string, block: BlockData) {
  return {
    type: SET_LATEST_BLOCK,
    payload: {
      block,
      networkId,
      blockType: 'latest',
    },
  }
}

export function setProcessingBlock(networkId: string, block: BlockData) {
  return {
    type: SET_PROCESSING_BLOCK,
    payload: {
      block,
      networkId,
      blockType: 'processing',
    },
  }
}

export function setCurrentBlock(networkId: string, block: BlockData) {
  return {
    type: SET_CURRENT_BLOCK,
    payload: {
      block,
      networkId,
      blockType: 'current',
    },
  }
}

export function nodeForked(networkId: string, oldBlock: BlockData, newBlock: BlockData) {
  return {
    type: NODE_FORKED,
    payload: {
      oldBlock,
      newBlock,
      networkId,
    },
  }
}

export function latestBlockSyncStop() {
  return {
    type: LATEST_BLOCK_SYNC_STOP,
  }
}

export function latestBlockSyncError(err: Error) {
  return {
    type: LATEST_BLOCK_SYNC_ERROR,
    payload: err,
    error: true,
  }
}

export function processQueueError(err: Error) {
  return {
    type: PROCESS_QUEUE_ERROR,
    payload: err,
    error: true,
  }
}

export function setIsTransactionsLoading(networkId: string, isLoading: boolean) {
  return {
    type: SET_IS_TRANSACTIONS_LOADING,
    payload: {
      networkId,
      isLoading,
    },
  }
}

export function setIsTransactionsFetched(networkId: string, isFetched: boolean) {
  return {
    type: SET_IS_TRANSACTIONS_FETCHED,
    payload: {
      networkId,
      isFetched,
    },
  }
}

export function setIsConnectionError(isConnectionError: boolean) {
  return {
    type: SET_IS_CONNECTION_ERROR,
    payload: {
      isConnectionError,
    },
  }
}

export function setInitialBlockNumber(blockNumber: number) {
  return {
    type: SET_INITIAL_BLOCK_NUMBER,
    payload: {
      blockNumber,
    },
  }
}

export type BlocksAction =
  ExtractReturn<typeof syncStart>
  | ExtractReturn<typeof syncStop>
  | ExtractReturn<typeof syncRestart>
  | ExtractReturn<typeof setLatestBlock>
  | ExtractReturn<typeof setProcessingBlock>
  | ExtractReturn<typeof setCurrentBlock>
  | ExtractReturn<typeof nodeForked>
  | ExtractReturn<typeof latestBlockSyncStop>
  | ExtractReturn<typeof latestBlockSyncError>
  | ExtractReturn<typeof processQueueError>
  | ExtractReturn<typeof setIsTransactionsLoading>
  | ExtractReturn<typeof setIsTransactionsFetched>
  | ExtractReturn<typeof setIsConnectionError>
  | ExtractReturn<typeof setInitialBlockNumber>

export type HistoryBlocksState = {|
  items: {
    [networkId: string]: ?Blocks,
  },
  isConnectionError: boolean,
  initialBlockNumber: ?number,
|}

const initialState: HistoryBlocksState = {
  items: {},
  isConnectionError: false,
  initialBlockNumber: null,
}

function blocks(
  state: HistoryBlocksState = initialState,
  action: BlocksAction,
): HistoryBlocksState {
  switch (action.type) {
    case SET_LATEST_BLOCK:
    case SET_PROCESSING_BLOCK:
    case SET_CURRENT_BLOCK: {
      const { items } = state

      const {
        block,
        blockType,
        networkId,
      } = action.payload

      const newItem: Blocks = {
        ...items[networkId],
        [blockType]: block,
      }

      return {
        ...state,
        items: {
          [networkId]: newItem,
        },
      }
    }

    case SET_IS_TRANSACTIONS_LOADING: {
      const { items } = state

      const {
        networkId,
        isLoading,
      } = action.payload

      const itemByNetworkId: ?Blocks = items[networkId]
      const processingBlock: ?BlockData = itemByNetworkId ? itemByNetworkId.processing : undefined

      return {
        ...state,
        items: {
          [networkId]: {
            ...itemByNetworkId,
            processing: {
              ...processingBlock,
              isTransactionsLoading: isLoading,
            },
          },
        },
      }
    }

    case SET_IS_TRANSACTIONS_FETCHED: {
      const { items } = state

      const {
        networkId,
        isFetched,
      } = action.payload

      const itemByNetworkId: ?Blocks = items[networkId]
      const processingBlock: ?BlockData = itemByNetworkId ? itemByNetworkId.processing : undefined

      return {
        ...state,
        items: {
          [networkId]: {
            ...itemByNetworkId,
            processing: {
              ...processingBlock,
              isTransactionsFetched: isFetched,
            },
          },
        },
      }
    }

    case SET_INITIAL_BLOCK_NUMBER: {
      return {
        ...state,
        initialBlockNumber: action.payload.blockNumber,
      }
    }

    case SET_IS_CONNECTION_ERROR:
      return {
        ...state,
        isConnectionError: action.payload.isConnectionError,
      }

    default:
      return state
  }
}

export default blocks
