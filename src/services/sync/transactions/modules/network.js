// @flow

import { MAINNET } from 'data/networks'

export const SET_CURRENT = '@@network/SET_CURRENT'

export function setCurrentNetwork(id: string) {
  return {
    type: SET_CURRENT,
    payload: {
      id,
    },
  }
}

type NetworkAction =
  ExtractReturn<typeof setCurrentNetwork>

export type NetworkState = {|
  id: string,
|}

function network(
  state: NetworkState = {
    id: MAINNET,
  },
  action: NetworkAction,
): NetworkState {
  switch (action.type) {
    case SET_CURRENT: {
      return {
        ...state,
        id: action.payload.id,
      }
    }

    default:
      return state
  }
}

export default network
