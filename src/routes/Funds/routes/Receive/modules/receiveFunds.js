// @flow

import { assoc, assocPath, compose, identity } from 'ramda'

import ethereum from 'data/assets/ethereum'

export const OPEN = '@@receiveFunds/OPEN'
export const CLOSE = '@@receiveFunds/CLOSE'
export const SET_ASSET = '@@receiveFunds/SET_ASSET'
export const SET_AMOUNT = '@@receiveFunds/SET_AMOUNT'
export const GENERATE = '@@receiveFunds/GENERATE'
export const GENERATE_SUCCESS = '@@receiveFunds/GENERATE_SUCCESS'
export const GENERATE_ERROR = '@@receiveFunds/GENERATE_ERROR'
export const COPY_ADDRESS = '@@receiveFunds/COPY_ADDRESS'
export const SET_IS_COPIED = '@@receiveFunds/SET_IS_COPIED'
export const COPY_QR_CODE = '@@receiveFunds/COPY_QR_CODE'
export const SAVE_QR_CODE = '@@receiveFunds/SAVE_QR_CODE'
export const SET_INVALID_FIELD = '@@receiveFunds/SET_INVALID_FIELD'
export const CLEAN = '@@receiveFunds/CLEAN'

export const open = (amount: number, assetAddress: ?Address): {
  type: string,
  payload: {
    amount: number,
    assetAddress: ?Address,
  },
} => ({
  type: OPEN,
  payload: {
    amount,
    assetAddress,
  },
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setAsset = (assetAddress: Address): {
  type: string,
  payload: {
    assetAddress: Address,
  },
} => ({
  type: SET_ASSET,
  payload: {
    assetAddress,
  },
})

export const setAmount = (amount: string): {
  type: string,
  payload: {
    amount: string,
  },
} => ({
  type: SET_AMOUNT,
  payload: {
    amount,
  },
})

export const copyAddress = (): { type: string } => ({
  type: COPY_ADDRESS,
})

export const setIsCopied = (isCopied: boolean): {
  type: string,
  payload: {
    isCopied: boolean,
  },
} => ({
  type: SET_IS_COPIED,
  payload: {
    isCopied,
  },
})

export const copyQRCode = (): { type: string } => ({
  type: COPY_QR_CODE,
})

export const saveQRCode = (): { type: string } => ({
  type: SAVE_QR_CODE,
})

export const generateSuccess = (walletType: WalletType): {
  type: string,
  payload: {
    walletType: WalletType,
  },
} => ({
  type: GENERATE_SUCCESS,
  payload: {
    walletType,
  },
})

export const generateError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: GENERATE_ERROR,
  payload: err,
  error: true,
})

export const setInvalidField = (fieldName: string, message: string): {
  type: string,
  payload: {
    fieldName: string,
    message: string,
  },
} => ({
  type: SET_INVALID_FIELD,
  payload: {
    fieldName,
    message,
  },
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: ReceiveFundsData = {
  invalidFields: {},
  assetAddress: ethereum.address,
  amount: '',
  isCopied: false,
}

const receiveFunds = (
  state: ReceiveFundsData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case OPEN: {
      return compose(
        payload.assetAddress ? assoc('assetAddress', payload.assetAddress) : identity,
        payload.amount ? assoc('amount', payload.amount.toString()) : identity,
      )(state)
    }

    case SET_ASSET: {
      return assoc('assetAddress', payload.assetAddress)(state)
    }

    case SET_AMOUNT: {
      return compose(
        assoc('amount', payload.amount),
        assocPath(['invalidFields', 'amount'], null),
      )(state)
    }

    case SET_IS_COPIED: {
      return assoc('isCopied', payload.isCopied)(state)
    }

    case SET_INVALID_FIELD: {
      return assocPath(['invalidFields', payload.fieldName], payload.message)(state)
    }

    case CLEAN: return initialState

    default: return state
  }
}

export default receiveFunds
