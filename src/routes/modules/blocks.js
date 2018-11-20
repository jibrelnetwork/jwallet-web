// @flow

export const SET_LATEST_BLOCK = '@@blocks/SET_LATEST_BLOCK'
export const SET_CURRENT_BLOCK = '@@blocks/SET_CURRENT_BLOCK'
export const SET_PROCESSING_BLOCK = '@@blocks/SET_PROCESSING_BLOCK'

export const SET_IS_BALANCES_FETCHED = '@@blocks/SET_IS_BALANCES_FETCHED'
export const SET_IS_TRANSACTIONS_FETCHED = '@@blocks/SET_IS_TRANSACTIONS_FETCHED'

export function setLatestBlock(networkId: NetworkId, block: BlockInfo) {
  return {
    type: SET_LATEST_BLOCK,
    payload: {
      block,
      networkId,
    },
  }
}

export function setCurrentBlock(networkId: NetworkId, block: BlockInfo) {
  return {
    type: SET_CURRENT_BLOCK,
    payload: {
      block,
      networkId,
    },
  }
}

export function setProcessingBlock(networkId: NetworkId, block: ?BlockInfo) {
  return {
    type: SET_PROCESSING_BLOCK,
    payload: {
      block,
      networkId,
    },
  }
}

export function setIsBalancesFetched(networkId: NetworkId) {
  return {
    type: SET_IS_BALANCES_FETCHED,
    payload: {
      networkId,
    },
  }
}

export function setIsTransactionsFetched(networkId: NetworkId) {
  return {
    type: SET_IS_TRANSACTIONS_FETCHED,
    payload: {
      networkId,
    },
  }
}

export type BlocksAction =
  ExtractReturn<typeof setLatestBlock>
  | ExtractReturn<typeof setCurrentBlock>
  | ExtractReturn<typeof setProcessingBlock>
  | ExtractReturn<typeof setIsBalancesFetched>
  | ExtractReturn<typeof setIsTransactionsFetched>

const initialState: BlocksState = {
  persist: {
    items: {},
  },
}

function blocks(
  state: BlocksState = initialState,
  action: BlocksAction,
): BlocksState {
  switch (action.type) {
    case SET_LATEST_BLOCK: {
      const { items } = state.persist
      const { networkId, block } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            [networkId]: {
              ...items[networkId],
              latestBlock: block,
            },
          },
        },
      }
    }

    case SET_CURRENT_BLOCK: {
      const { items } = state.persist
      const { networkId, block } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            [networkId]: {
              ...items[networkId],
              currentBlock: block,
            },
          },
        },
      }
    }

    case SET_PROCESSING_BLOCK: {
      const { items } = state.persist
      const { networkId, block } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            [networkId]: {
              ...items[networkId],
              processingBlock: block,
            },
          },
        },
      }
    }

    case SET_IS_TRANSACTIONS_FETCHED: {
      const { items } = state.persist
      const { networkId } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            [networkId]: {
              ...items[networkId],
              currentBlock: {
                ...items[networkId].currentBlock,
                issTransactionsFetched: true,
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

export default blocks
