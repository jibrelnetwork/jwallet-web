// @flow strict

export const SET_NEW_PASSWORD = '@@password/SET_NEW_PASSWORD'

export function setNewPassword(internalKey: EncryptedData, hint: string) {
  return {
    type: SET_NEW_PASSWORD,
    payload: {
      internalKey,
      hint,
    },
  }
}

export type PasswordAction = ExtractReturn<typeof setNewPassword>

const initialState: PasswordState = {
  persist: {
    internalKey: null,
    hint: '',
  },
}

export function password(
  state: PasswordState = initialState,
  action: PasswordAction,
): PasswordState {
  switch (action.type) {
    case SET_NEW_PASSWORD: {
      const {
        internalKey,
        hint,
      } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          internalKey,
          hint,
        },
      }
    }

    default:
      return state
  }
}
