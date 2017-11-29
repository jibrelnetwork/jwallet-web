export const NOTIFICATION_CHECK = 'NOTIFICATION_CHECK'
export const NOTIFICATION_OPEN = 'NOTIFICATION_OPEN'
export const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE'

export function checkNotification() {
  return {
    type: NOTIFICATION_CHECK,
  }
}

export function closeNotification() {
  return {
    type: NOTIFICATION_CLOSE,
  }
}

const ACTION_HANDLERS = {
  [NOTIFICATION_OPEN]: state => ({
    ...state,
    isOpen: true,
  }),
  [NOTIFICATION_CLOSE]: () => initialState,
}

const initialState = {
  isOpen: false,
}

export default function notification(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
