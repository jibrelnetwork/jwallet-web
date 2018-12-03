// @flow

export const SYNC_START = '@@balances/SYNC_START'
export const SYNC_STOP = '@@balances/SYNC_STOP'
export const SYNC_ERROR = '@@balances/SYNC_ERROR'
export const SYNC_CANCELLED = '@@balances/SYNC_CANCELLED'

export const INIT_AT_BLOCK = '@@balances/INIT_AT_BLOCK'
export const UPDATE_BALANCE = '@@balances/UPDATE_BALANCE'

export function syncStart(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: Address,
  processingBlock: BlockData,
) {
  return {
    type: SYNC_START,
    payload: {
      requestQueue,
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

export function initAtBlock(
  networkId: NetworkId,
  blockNumber: number,
  ownerAddress: Address,
  initialItems: Balances,
) {
  return {
    type: INIT_AT_BLOCK,
    payload: {
      networkId,
      blockNumber,
      ownerAddress,
      initialItems,
    },
  }
}

export function updateBalance(
  networkId: NetworkId,
  blockNumber: number,
  ownerAddress: Address,
  assetAddress: Address,
  balance: Balance,
) {
  return {
    type: UPDATE_BALANCE,
    payload: {
      networkId,
      blockNumber,
      ownerAddress,
      assetAddress,
      balance,
    },
  }
}

export type BalancesAction =
  ExtractReturn<typeof syncStart> |
  ExtractReturn<typeof syncStop> |
  ExtractReturn<typeof syncError> |
  ExtractReturn<typeof syncCancelled> |
  ExtractReturn<typeof initAtBlock> |
  ExtractReturn<typeof updateBalance>

const initialState: BalancesState = {
  persist: {
    items: {},
  },
}

const updateBlock = (
  state: BalancesState,
  networkId: NetworkId,
  blockNumber: number,
  ownerAddress: Address,
  ownerBalances: Balances,
): BalancesState => {
  const { persist } = state
  const itemByNetworkId = persist.items[networkId]
  const itemByBlockNumber = itemByNetworkId ? itemByNetworkId[blockNumber.toString()] : undefined
  const itemByOwnerAddress = itemByBlockNumber ? itemByBlockNumber[ownerAddress] : undefined

  return {
    ...state,
    persist: {
      ...persist,
      items: {
        ...persist.items,
        [networkId]: {
          ...itemByNetworkId,
          [blockNumber.toString()]: {
            ...itemByBlockNumber,
            [ownerAddress]: {
              ...itemByOwnerAddress,
              ...ownerBalances,
            },
          },
        },
      },
    },
  }
}

function balances(
  state: BalancesState = initialState,
  action: BalancesAction,
): BalancesState {
  switch (action.type) {
    case INIT_AT_BLOCK: {
      const {
        networkId,
        blockNumber,
        ownerAddress,
        initialItems,
      } = action.payload

      return updateBlock(
        state,
        networkId,
        blockNumber,
        ownerAddress,
        initialItems
      )
    }

    case UPDATE_BALANCE: {
      const {
        networkId,
        blockNumber,
        ownerAddress,
        assetAddress,
        balance,
      } = action.payload

      return updateBlock(
        state,
        networkId,
        blockNumber,
        ownerAddress,
        { [assetAddress]: balance }
      )
    }

    default:
      return state
  }
}

export default balances
