// @flow strict

export function selectToasts(state: AppState): ToastsState {
  return state.toasts
}

export function selectToastsData(state: AppState): ?ToastData {
  const toasts: ToastsState = selectToasts(state)

  return toasts.data
}
