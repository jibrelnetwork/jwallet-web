// @flow

export const OPEN_VIEW: '@@terms/OPEN_VIEW' = '@@terms/OPEN_VIEW'
export const CLOSE_VIEW: '@@terms/CLOSE_VIEW' = '@@terms/CLOSE_VIEW'

export const GO_TO_HOME: '@@terms/GO_TO_HOME' = '@@terms/GO_TO_HOME'

export function openView() {
  return {
    type: OPEN_VIEW,
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function goToHome() {
  return {
    type: GO_TO_HOME,
  }
}

export type TermsAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof goToHome>
