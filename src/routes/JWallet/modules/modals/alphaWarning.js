export const ALPHA_WARNING_OPEN_MODAL = 'ALPHA_WARNING_OPEN_MODAL'
export const ALPHA_WARNING_CLOSE_MODAL = 'ALPHA_WARNING_CLOSE_MODAL'

export function openAlphaWarningModal() {
  return {
    type: ALPHA_WARNING_OPEN_MODAL,
  }
}

export function closeAlphaWarningModal() {
  return {
    type: ALPHA_WARNING_CLOSE_MODAL,
  }
}

const ACTION_HANDLERS = {
  [ALPHA_WARNING_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
  }),
  [ALPHA_WARNING_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
}

const initialState = {
  onClose: null,
  isOpen: true,
}

export default function alphaWarningModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
