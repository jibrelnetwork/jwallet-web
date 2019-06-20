// @flow

export function selectUser(state: AppState): UserState {
  return state.user
}

export function selectIntroductionValue(state: AppState): boolean {
  return state.user.persist.isIntroductionPassed
}

export function selectAgreementsConditions(state: AppState) {
  return state.user.persist.agreementsConditions || {}
}

export function selectIsAgreementsConfirmed(state: AppState): boolean {
  return state.user.persist.isAgreementsConfirmed || false
}
