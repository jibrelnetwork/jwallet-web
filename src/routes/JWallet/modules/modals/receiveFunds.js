export const RECEIVE_FUNDS_OPEN_MODAL = 'RECEIVE_FUNDS_OPEN_MODAL'
export const RECEIVE_FUNDS_CLOSE_MODAL = 'RECEIVE_FUNDS_CLOSE_MODAL'
export const RECEIVE_FUNDS_SET_AMOUNT = 'RECEIVE_FUNDS_SET_AMOUNT'

export function openReceiveFundsModal(accountId, onClose) {
  return {
    type: RECEIVE_FUNDS_OPEN_MODAL,
    accountId,
    onClose,
  }
}

export function closeReceiveFundsModal() {
  return {
    type: RECEIVE_FUNDS_CLOSE_MODAL,
  }
}

export function setReceiveFundsAmount(amount) {
  return {
    type: RECEIVE_FUNDS_SET_AMOUNT,
    amount,
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_FUNDS_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [RECEIVE_FUNDS_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [RECEIVE_FUNDS_SET_AMOUNT]: (state, action) => ({
    ...state,
    amount: action.amount,
  }),
}

const initialState = {
  amount: '',
  isOpen: false,
}

export default function receiveFundsModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
