// @flow strict

export function selectPassword(state: AppState): PasswordState {
  return state.password
}

export function selectPasswordPersist(state: AppState): PasswordPersist {
  const password: PasswordState = selectPassword(state)

  return password.persist
}

export function selectPasswordInternalKey(state: AppState): ?EncryptedData {
  const passwordPersist: PasswordPersist = selectPasswordPersist(state)

  return passwordPersist.internalKey
}

export function selectPasswordHint(state: AppState): string {
  const passwordPersist: PasswordPersist = selectPasswordPersist(state)

  return passwordPersist.hint
}
