// @flow

export const SET_FROM_ASSET = '@@convertFunds/SET_FROM_ASSET'
export const SET_FROM_AMOUNT = '@@convertFunds/SET_FROM_AMOUNT'
export const SET_TO_ASSET = '@@convertFunds/SET_TO_ASSET'
export const SET_TO_AMOUNT = '@@convertFunds/SET_TO_AMOUNT'
export const CLEAN = '@@convertFunds/CLEAN'
export const CONVERT = '@@convertFunds/CONVERT'

export function setFromAsset(address: Address) {
  return {
    type: SET_FROM_ASSET,
    address,
  }
}

export function setFromAmount(amount) {
  return {
    type: SET_FROM_AMOUNT,
    amount,
  }
}

export function setToAsset(address: Address) {
  return {
    type: SET_TO_ASSET,
    address,
  }
}

export function setToAmount(amount: string) {
  return {
    type: SET_TO_AMOUNT,
    amount,
  }
}

export function convertFunds() {
  return {
    type: CONVERT,
  }
}

const ACTION_HANDLERS = {
  [SET_FROM_ASSET]: (state, action) => ({
    ...state,
    fromAsset: action.address,
  }),
  [SET_FROM_AMOUNT]: (state, action) => ({
    ...state,
    fromAmount: action.amount,
  }),
  [SET_TO_ASSET]: (state, action) => ({
    ...state,
    toAsset: action.address,
  }),
  [SET_TO_AMOUNT]: (state, action) => ({
    ...state,
    toAmount: action.amount,
  }),
  [CLEAN]: () => initialState,
}

const initialState = {
  invalidFields: {},
  fromAsset: 'ETH',
  fromAmount: '',
  toAsset: 'JNT',
  toAmount: '',
}

export default function convertFunds(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
