// @flow

export const SET_CURRENT = '@@priorities/SET_CURRENT'

const DEFAULT_META = {
  createdBlockNumber: 1,
}

export function setCurrentPriority(
  address: string,
  digitalAssets: DigitalAssets,
  meta: ?{
    createdBlockNumber: number,
  },
) {
  return {
    type: SET_CURRENT,
    payload: {
      address,
      digitalAssets,
      meta,
    },
  }
}

type PriorityAction =
  ExtractReturn<typeof setCurrentPriority>

type HistorySyncPriority = {|
  +address: string,
  +digitalAssets: DigitalAssets,
  +meta: {
    createdBlockNumber: number,
  },
|}

export type PrioritiesState = {|
  +current: ?HistorySyncPriority,
|}

export default function priorities(
  state: PrioritiesState = {
    current: null,
  },
  action: PriorityAction,
): PrioritiesState {
  switch (action.type) {
    case SET_CURRENT: {
      return {
        ...state,
        current: {
          address: action.payload.address,
          digitalAssets: action.payload.digitalAssets,
          meta: {
            ...DEFAULT_META,
            ...(action.payload.meta || {}),
          },
        },
      }
    }

    default:
      return state
  }
}
