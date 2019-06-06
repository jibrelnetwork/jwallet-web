// @flow strict

export const SET_NONCE: '@@address/SET_NONCE' = '@@address/SET_NONCE'

export function setNonce(nonce: number) {
  return {
    type: SET_NONCE,
    payload: {
      nonce,
    },
  }
}

export type AddressState = {|
  +persist: {
    +nonce: ?number,
  },
|}

const initialState: AddressState = {
  persist: {
    nonce: null,
  },
}

export type AddressAction
  = ExtractReturn<typeof setNonce>

export function address(
  state: AddressState = initialState,
  action: AddressAction,
) {
  const {
    type,
    payload,
  } = action

  switch (type) {
    case '@@address/SET_NONCE':
      return {
        ...state,
        persist: {
          ...state.persist,
          nonce: payload.nonce,
        },
      }
    default:
      return state
  }
}
