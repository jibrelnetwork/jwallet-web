// @flow

export const SET_ASSET = '@@receiveFunds/SET_ASSET'
export const SET_AMOUNT = '@@receiveFunds/SET_AMOUNT'
export const SET_INVALID_FIELD = '@@receiveFunds/SET_INVALID_FIELD'
export const CLEAN = '@@receiveFunds/CLEAN'
export const COPY_ADDRESS = '@@receiveFunds/COPY_ADDRESS'
export const SAVE_QR_CODE = '@@receiveFunds/SAVE_QR_CODE'

export function setAsset(symbol: string): { type: string, symbol: string } {
  return {
    type: SET_ASSET,
    symbol,
  }
}

export function setAmount(amount: string): { type: string, amount: string } {
  return {
    type: SET_AMOUNT,
    amount,
  }
}

export function copyAddress(): { type: string } {
  return {
    type: COPY_ADDRESS,
  }
}

export function saveQRCode(): { type: string } {
  return {
    type: SAVE_QR_CODE,
  }
}

const ACTION_HANDLERS = {
  [SET_ASSET]: (state, action) => ({
    ...state,
    symbol: action.symbol,
  }),
  [SET_AMOUNT]: (state, action) => ({
    ...state,
    amount: action.amount,
    invalidFields: {
      ...state.invalidFields,
      amount: '',
    },
  }),
  [SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: {
      ...state.invalidFields,
      [action.fieldName]: action.message,
    },
  }),
  [CLEAN]: () => initialState,
}

const initialState = {
  invalidFields: {},
  symbol: 'ETH',
  amount: '',
}

export default function receiveFunds(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
