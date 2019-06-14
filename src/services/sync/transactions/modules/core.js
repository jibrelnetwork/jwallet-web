// @flow strict

export const SYNC_START = '@@core/SYNC_START'
export const SYNC_STOP = '@@core/SYNC_STOP'

export function start() {
  return {
    type: SYNC_START,
  }
}

export function stop() {
  return {
    type: SYNC_STOP,
  }
}

export type HistoryAction =
  ExtractReturn<typeof start> |
  ExtractReturn<typeof stop>
