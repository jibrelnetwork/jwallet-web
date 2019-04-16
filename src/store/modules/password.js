// @flow strict

export const SET_NEW_PASSWORD = '@@password/SET_NEW_PASSWORD'

export function setNewPassword({
  hint,
  salt,
  internalKey,
}: PasswordPersist) {
  return {
    type: SET_NEW_PASSWORD,
    payload: {
      internalKey,
      hint,
      salt,
    },
  }
}

export type PasswordAction = ExtractReturn<typeof setNewPassword>

const initialState: PasswordState = {
  persist: {
    internalKey: null,
    hint: '',
    salt: '',
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

    default:
      return state
  }
}
