// @flow

export const CLEAR = '@@clearKeys/CLEAR'

export function clear(): { type: string } {
  return {
    type: CLEAR,
  }
}

const ACTION_HANDLERS = {}

const initialState = {}

export default function clearKeys(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
