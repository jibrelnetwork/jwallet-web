const SEND_FUNDS = 'SEND_FUNDS'
const RECEIVE_FUNDS = 'RECEIVE_FUNDS'
const CONVERT_FUNDS = 'CONVERT_FUNDS'

export function sendFunds() {
  return {
    type: SEND_FUNDS,
  }
}

export function receiveFunds() {
  return {
    type: RECEIVE_FUNDS,
  }
}

export function convertFunds() {
  return {
    type: CONVERT_FUNDS,
  }
}

const ACTION_HANDLERS = {
  [SEND_FUNDS]: state => ({
    ...state,
  }),
  [RECEIVE_FUNDS]: state => ({
    ...state,
  }),
  [CONVERT_FUNDS]: state => ({
    ...state,
  }),
}

const initialState = {}

export default function funds(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
