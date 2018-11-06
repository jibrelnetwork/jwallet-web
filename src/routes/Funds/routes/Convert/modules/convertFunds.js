// @flow

import { assoc } from 'ramda'

export const SET_FROM_ASSET = '@@convertFunds/SET_FROM_ASSET'
export const SET_FROM_AMOUNT = '@@convertFunds/SET_FROM_AMOUNT'
export const SET_TO_ASSET = '@@convertFunds/SET_TO_ASSET'
export const SET_TO_AMOUNT = '@@convertFunds/SET_TO_AMOUNT'
export const CLEAN = '@@convertFunds/CLEAN'
export const CONVERT = '@@convertFunds/CONVERT'

export const setFromAsset = (address: Address): {
  type: string,
  payload: {
    address: Address,
  },
} => ({
  type: SET_FROM_ASSET,
  payload: {
    address,
  },
})

export const setFromAmount = (amount: string): {
  type: string,
  payload: {
    amount: string,
  },
} => ({
  type: SET_FROM_AMOUNT,
  payload: {
    amount,
  },
})

export const setToAsset = (address: Address): {
  type: string,
  payload: {
    address: Address,
  },
} => ({
  type: SET_TO_ASSET,
  payload: {
    address,
  },
})

export const setToAmount = (amount: string): {
  type: string,
  payload: {
    amount: string,
  },
} => ({
  type: SET_TO_AMOUNT,
  payload: {
    amount,
  },
})

export const convert = (): { type: string } => ({
  type: CONVERT,
})

const initialState: ConvertFundsData = {
  invalidFields: {},
  fromAsset: 'ETH',
  fromAmount: '',
  toAsset: 'JNT',
  toAmount: '',
}

const convertFunds = (
  state: ConvertFundsData = initialState,
  action: Object,
): Object => {
  const { type, payload } = action

  switch (type) {
    case SET_FROM_ASSET: {
      return assoc('fromAsset', payload.address)(state)
    }

    case SET_FROM_AMOUNT: {
      return assoc('fromAmount', payload.amount)(state)
    }

    case SET_TO_ASSET: {
      return assoc('toAsset', payload.address)(state)
    }

    case SET_TO_AMOUNT: {
      return assoc('toAmount', payload.amount)(state)
    }

    case CLEAN: return initialState

    default: return state
  }
}

export default convertFunds
