// @flow

export function selectUser(state: AppState): UserState {
  return state.user
}

export function selectIntroductionValue(state: AppState): boolean {
  return state.user.persist.isIntroductionPassed
}

export function selectAgreements(state: AppState): boolean {
  return state.user.persist.agreements || {}
}
