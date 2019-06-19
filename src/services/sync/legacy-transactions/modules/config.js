// @flow

export const SET_CURRENT_NETWORK = '@@config/SET_CURRENT_NETWORK'
export const SET_CURRENT_ADDRESS = '@@config/SET_CURRENT_ADDRESS'
export const SET_CURRENT_ASSETS = '@@config/SET_CURRENT_ASSETS'

export function setCurrentNetwork(
  networkId: string,
) {
  return {
    type: SET_CURRENT_NETWORK,
    payload: {
      networkId,
    },
  }
}

export function setCurrentAddress(
  address: string,
  createdBlockNumber: number = 1,
) {
  return {
    type: SET_CURRENT_ADDRESS,
    payload: {
      address,
      createdBlockNumber,
    },
  }
}

export function setCurrentAssets(
  digitalAssets: DigitalAssets,
) {
  return {
    type: SET_CURRENT_ASSETS,
    payload: {
      digitalAssets,
    },
  }
}

type ConfigAction =
  ExtractReturn<typeof setCurrentNetwork>
  | ExtractReturn<typeof setCurrentAddress>
  | ExtractReturn<typeof setCurrentAssets>

export type ConfigState = {
  +networkId: string,
  +address: string,
  +digitalAssets: DigitalAssets,
  +createdBlockNumber: number,
}

export default function config(
  state: ConfigState = {},
  action: ConfigAction,
): ConfigState {
  switch (action.type) {
    case SET_CURRENT_NETWORK:
    case SET_CURRENT_ADDRESS:
    case SET_CURRENT_ASSETS: {
      return {
        ...state,
        ...action.payload,
      }
    }

    default:
      return state
  }
}
