// @flow

export function selectUser(state: AppState): UserState {
  return state.user
}

export function selectIntroductionValue(state: AppState): boolean {
  return state.user.persist.isIntroductionPassed
}
