// @flow

export const SET_LATEST_BLOCK = '@@blocks/SET_LATEST_BLOCK'
export const SET_CURRENT_BLOCK = '@@blocks/SET_CURRENT_BLOCK'
export const SET_PROCESSING_BLOCK = '@@blocks/SET_PROCESSING_BLOCK'

export const SET_IS_BALANCES_LOADING = '@@blocks/SET_IS_BALANCES_LOADING'
export const SET_IS_TRANSACTIONS_LOADING = '@@blocks/SET_IS_TRANSACTIONS_LOADING'

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

export function setIsBalancesLoading(networkId: NetworkId, isLoading: boolean) {
  return {
    type: SET_IS_BALANCES_LOADING,
    payload: {
      networkId,
      isLoading,
    },
  }
}

export function setIsTransactionsLoading(networkId: NetworkId, isLoading: boolean) {
  return {
    type: SET_IS_TRANSACTIONS_LOADING,
    payload: {
      networkId,
      isLoading,
    },
  }
}

export function setIsBalancesFetched(networkId: NetworkId, isFetched: boolean) {
  return {
    type: SET_IS_BALANCES_FETCHED,
    payload: {
      networkId,
      isFetched,
    },
  }
}

export function setIsTransactionsFetched(networkId: NetworkId, isFetched: boolean) {
  return {
    type: SET_IS_TRANSACTIONS_FETCHED,
    payload: {
      networkId,
      isFetched,
    },
  }
}

export type BlocksAction =
  ExtractReturn<typeof setLatestBlock>
  | ExtractReturn<typeof setCurrentBlock>
  | ExtractReturn<typeof setProcessingBlock>
  | ExtractReturn<typeof setIsBalancesLoading>
  | ExtractReturn<typeof setIsTransactionsLoading>
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

    case SET_IS_BALANCES_LOADING: {
      const { items } = state.persist
      const { networkId, isLoading } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            [networkId]: {
              ...items[networkId],
              processingBlock: {
                ...items[networkId].processingBlock,
                isBalancesLoading: isLoading,
              },
            },
          },
        },
      }
    }

    case SET_IS_TRANSACTIONS_LOADING: {
      const { items } = state.persist
      const { networkId, isLoading } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            [networkId]: {
              ...items[networkId],
              processingBlock: {
                ...items[networkId].processingBlock,
                isTransactionsLoading: isLoading,
              },
            },
          },
        },
      }
    }

    case SET_IS_BALANCES_FETCHED: {
      const { items } = state.persist
      const { networkId, isFetched } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            [networkId]: {
              ...items[networkId],
              processingBlock: {
                ...items[networkId].processingBlock,
                isBalancesFetched: isFetched,
              },
            },
          },
        },
      }
    }

    case SET_IS_TRANSACTIONS_FETCHED: {
      const { items } = state.persist
      const { networkId, isFetched } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            [networkId]: {
              ...items[networkId],
              processingBlock: {
                ...items[networkId].processingBlock,
                isTransactionsFetched: isFetched,
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
