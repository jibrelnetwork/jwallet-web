// @flow

export const INIT_AT_BLOCK = '@@balances/INIT_AT_BLOCK'
export const UPDATE_BALANCE = '@@balances/UPDATE_BALANCE'

export function initAtBlock(
  networkId: NetworkId,
  blockNumber: number,
  ownerAddress: Address,
  initialItems: OwnerBalances,
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

export type BalancesAction = ExtractReturn<typeof initAtBlock> |
  ExtractReturn<typeof updateBalance>

const initialState: BalancesState = {
  persist: {
    balances: {},
  },
}

const updateBlock = (
  state: BalancesState,
  networkId: NetworkId,
  blockNumber: number,
  ownerAddress: Address,
  ownerBalances: OwnerBalances,
): BalancesState => {
  const { persist } = state
  const block = blockNumber.toString()

  const blockState = persist.balances[networkId]
    ? persist.balances[networkId][block]
    : undefined

  const ownerState = (blockState && persist.balances[networkId][block]
    ? persist.balances[networkId][block][ownerAddress]
    : undefined
  )

  return {
    ...state,
    persist: {
      ...persist,
      balances: {
        ...persist.balances,
        [networkId]: {
          ...persist.balances[networkId],
          [block]: {
            ...blockState,
            [ownerAddress]: {
              ...ownerState,
              ...ownerBalances,
            },
          },
        },
      },
    },
  }
}

const balances = (
  state: BalancesState = initialState,
  action: BalancesAction,
): BalancesState => {
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
