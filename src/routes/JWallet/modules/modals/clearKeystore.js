export const CLEAR_KEYSTORE_OPEN_MODAL = 'CLEAR_KEYSTORE_OPEN_MODAL'
export const CLEAR_KEYSTORE_CLOSE_MODAL = 'CLEAR_KEYSTORE_CLOSE_MODAL'

export function openClearKeystoreModal(onClose = null) {
  return {
    type: CLEAR_KEYSTORE_OPEN_MODAL,
    onClose,
  }
}

export function closeClearKeystoreModal() {
  return {
    type: CLEAR_KEYSTORE_CLOSE_MODAL,
  }
}

const ACTION_HANDLERS = {
  [CLEAR_KEYSTORE_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [CLEAR_KEYSTORE_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
}

const initialState = {
  onClose: null,
  isOpen: false,
}

export default function clearKeystoreModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
