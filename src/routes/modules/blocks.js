// @flow

export const SET_LATEST_BLOCK = '@@blocks/SET_LATEST_BLOCK'
export const SET_CURRENT_BLOCK = '@@blocks/SET_CURRENT_BLOCK'
export const SET_IS_BALANCES_FETCHED = '@@blocks/CURRENT_BLOCK/SET_IS_BALANCES_FETCHED'

export const SET_PROCESSED_BLOCK = '@@blocks/SET_PROCESSED_BLOCK'
export const CLEAN = '@@blocks/CLEAN'

export function setLatestBlock(networkId: NetworkId, block: BlockInfo) {
  return {
    type: SET_LATEST_BLOCK,
    payload: {
      networkId,
      block,
    },
  }
}

export function setCurrentBlock(networkId: NetworkId, block: ?BlockInfo) {
  return {
    type: SET_CURRENT_BLOCK,
    payload: {
      networkId,
      block,
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

export function setProcessedBlock(networkId: NetworkId, block: BlockInfo) {
  return {
    type: SET_PROCESSED_BLOCK,
    payload: {
      networkId,
      block,
    },
  }
}

export function clean(networkId: NetworkId) {
  return {
    type: CLEAN,
    payload: {
      networkId,
    },
  }
}

export type BlocksAction = ExtractReturn<typeof setLatestBlock>
  | ExtractReturn<typeof setCurrentBlock>
  | ExtractReturn<typeof setBalancesIsFetched>
  | ExtractReturn<typeof setProcessedBlock>
  | ExtractReturn<typeof clean>

const initialState: BlocksState = {
  persist: {
    blocks: { },
  },
}

const digitalAssets = (
  state: BlocksState = initialState,
  action: BlocksAction,
): BlocksState => {
  switch (action.type) {
    case SET_LATEST_BLOCK: {
      const { networkId, block } = action.payload
      const { blocks } = state.persist

      return {
        ...state,
        persist: {
          ...state.persist,
          blocks: {
            [networkId]: {
              ...blocks[networkId],
              latestBlock: block,
            },
          },
        },
      }
    }

    case SET_CURRENT_BLOCK: {
      const { networkId, block } = action.payload
      const { blocks } = state.persist

      return {
        ...state,
        persist: {
          ...state.persist,
          blocks: {
            [networkId]: {
              ...blocks[networkId],
              currentBlock: block,
            },
          },
        },
      }
    }

    case SET_IS_BALANCES_FETCHED: {
      const { networkId } = action.payload
      const { blocks } = state.persist

      return {
        ...state,
        persist: {
          ...state.persist,
          blocks: {
            [networkId]: {
              ...blocks[networkId],
              currentBlock: {
                ...blocks[networkId].currentBlock,
                isBalancesFetched: true,
              },
            },
          },
        },
      }
    }

    case SET_PROCESSED_BLOCK: {
      const { networkId, block } = action.payload
      const { blocks } = state.persist

      return {
        ...state,
        persist: {
          ...state.persist,
          blocks: {
            [networkId]: {
              ...blocks[networkId],
              processedBlock: block,
            },
          },
        },
      }
    }

    default:
      return state
  }
}

export default digitalAssets
