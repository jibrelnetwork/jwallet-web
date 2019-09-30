// @flow strict

export const SET_NEW_PASSWORD = '@@password/SET_NEW_PASSWORD'
export const APPLY_PASSWORD_MIGRATION = '@@password/APPLY_PASSWORD_MIGRATION'

export function setNewPassword(
  internalKey: EncryptedData,
  salt: string,
  hint: string,
) {
  return {
    type: SET_NEW_PASSWORD,
    payload: {
      internalKey,
      hint,
      salt,
    },
  }
}

export function applyPasswordMigration(payload: PasswordPersist) {
  return {
    type: APPLY_PASSWORD_MIGRATION,
    payload,
  }
}

export type PasswordAction =
  ExtractReturn<typeof setNewPassword> |
  ExtractReturn<typeof applyPasswordMigration>

const initialState: PasswordState = {
  persist: {
    internalKey: null,
    hint: '',
    salt: '',
    version: 1,
  },
}

export function password(
  state: PasswordState = initialState,
  action: PasswordAction,
): PasswordState {
  switch (action.type) {
    case SET_NEW_PASSWORD:
      return {
        ...state,
        persist: {
          ...state.persist,
          ...action.payload,
        },
      }

    case APPLY_PASSWORD_MIGRATION:
      return {
        ...state,
        persist: action.payload,
      }

    default:
      return state
  }
}
