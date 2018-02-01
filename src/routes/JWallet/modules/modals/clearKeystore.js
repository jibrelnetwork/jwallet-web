// @flow

export const CLEAR_KEYSTORE_OPEN_MODAL = 'CLEAR_KEYSTORE_OPEN_MODAL'
export const CLEAR_KEYSTORE_CLOSE_MODAL = 'CLEAR_KEYSTORE_CLOSE_MODAL'

export function openClearKeystoreModal(onClose: any) {
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
  [CLEAR_KEYSTORE_CLOSE_MODAL]: () => initialState,
}

const initialState = {
  isOpen: false,
  onClose: null,
}

export default function clearKeystoreModal(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
