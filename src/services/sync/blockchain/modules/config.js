// @flow strict

export const SET_CURRENT_NETWORK = '@@config/SET_CURRENT_NETWORK'
export const SET_CURRENT_ADDRESS = '@@config/SET_CURRENT_ADDRESS'
export const SET_CURRENT_ASSETS = '@@config/SET_CURRENT_ASSETS'
export const SET_DB_INSTANCE = '@@config/SET_DB_INSTANCE'

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
  createdBlockNumber: number = 0,
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

export function setDBInstance(
  db: IDBDatabase,
) {
  return {
    type: SET_DB_INSTANCE,
    payload: {
      db,
    },
  }
}

type ConfigAction =
  ExtractReturn<typeof setCurrentNetwork>
  | ExtractReturn<typeof setCurrentAddress>
  | ExtractReturn<typeof setCurrentAssets>
  | ExtractReturn<typeof setDBInstance>

export type ConfigState = {
  +networkId: string,
  +address: string,
  +digitalAssets: DigitalAssets,
  +createdBlockNumber: number,
  +db: IDBDatabase,
}

export default function config(
  state: ConfigState = {},
  action: ConfigAction,
): ConfigState {
  switch (action.type) {
    case SET_CURRENT_NETWORK:
    case SET_CURRENT_ADDRESS:
    case SET_CURRENT_ASSETS:
    case SET_DB_INSTANCE: {
      return {
        ...state,
        ...action.payload,
      }
    }

    default:
      return state
  }
}
