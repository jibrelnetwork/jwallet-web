// @flow strict

export const SET_ASSETS_SYNC_PARAMETERS = '@@historical/SET_ASSETS_SYNC_PARAMETERS'

export function setAssetsSyncParameters(params: {
  [address: string]: {
    start: number,
    end: number,
    isSynced: boolean,
  },
}) {
  return {
    type: SET_ASSETS_SYNC_PARAMETERS,
    payload: {
      params,
    },
  }
}

export type HistoricalSyncAction =
  ExtractReturn<typeof setAssetsSyncParameters>

export type HistoricalSyncState = {
  [address: string]: {|
    start: number,
    end: number,
    isSynced: boolean,
  |},
}

const initialState: HistoricalSyncState = {}

export default function historical(
  state: HistoricalSyncState = initialState,
  action: HistoricalSyncAction,
): HistoricalSyncState {
  switch (action.type) {
    case SET_ASSETS_SYNC_PARAMETERS: {
      const {
        params,
      } = action.payload

      return {
        ...state,
        ...params,
      }
    }

    default:
      return state
  }
}
