export const OPEN_MODAL = 'ALPHA_WARNING_OPEN_MODAL'
export const CLOSE_MODAL = 'ALPHA_WARNING_CLOSE_MODAL'
export const START_TIMER = 'ALPHA_WARNING_START_TIMER'
export const SET_SECONDS = 'ALPHA_WARNING_SET_SECONDS'

export function openModal() {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function startTimer() {
  return {
    type: START_TIMER,
  }
}

export function setSeconds(seconds: number) {
  return {
    type: SET_SECONDS,
    seconds,
  }
}

const ACTION_HANDLERS = {
  [OPEN_MODAL]: state => ({
    ...state,
    isOpen: true,
  }),
  [CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [SET_SECONDS]: (state, action) => ({
    ...state,
    seconds: action.seconds,
  }),
}

const initialState = {
  seconds: 5,
  isOpen: !__DEV__,
}

export default function alphaWarningModal(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
