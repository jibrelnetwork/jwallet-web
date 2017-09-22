export const OPEN_SEND_FUNDS_MODAL = 'OPEN_SEND_FUNDS_MODAL'
export const CLOSE_SEND_FUNDS_MODAL = 'CLOSE_SEND_FUNDS_MODAL'
export const SET_SEND_FUNDS_ADDRESS = 'SET_SEND_FUNDS_ADDRESS'
export const SET_SEND_FUNDS_AMOUNT = 'SET_SEND_FUNDS_AMOUNT'
export const SET_SEND_FUNDS_SYMBOL = 'SET_SEND_FUNDS_SYMBOL'
export const SET_SEND_FUNDS_ACCOUNT = 'SET_SEND_FUNDS_ACCOUNT'
export const SET_SEND_FUNDS_GAS = 'SET_SEND_FUNDS_GAS'
export const SET_SEND_FUNDS_GAS_PRICE = 'SET_SEND_FUNDS_GAS_PRICE'
export const SET_SEND_FUNDS_GAS_SYMBOL = 'SET_SEND_FUNDS_GAS_SYMBOL'
export const SET_SEND_FUNDS_PINCODE = 'SET_SEND_FUNDS_PINCODE'
export const SET_SEND_FUNDS_IS_PINCODE_INCORRECT = 'SET_SEND_FUNDS_IS_PINCODE_INCORRECT'
export const TYPE_SEND_FUNDS_PINCODE = 'TYPE_SEND_FUNDS_PINCODE'
export const SEND_FUNDS = 'SEND_FUNDS'

export const OPEN_RECEIVE_FUNDS_MODAL = 'OPEN_RECEIVE_FUNDS_MODAL'
export const CLOSE_RECEIVE_FUNDS_MODAL = 'CLOSE_RECEIVE_FUNDS_MODAL'
export const SET_RECEIVE_FUNDS_AMOUNT = 'SET_RECEIVE_FUNDS_AMOUNT'
export const SET_RECEIVE_FUNDS_SYMBOL = 'SET_RECEIVE_FUNDS_SYMBOL'
export const SET_RECEIVE_FUNDS_ACCOUNT = 'SET_RECEIVE_FUNDS_ACCOUNT'
export const SET_RECEIVE_FUNDS_ADDRESS = 'SET_RECEIVE_FUNDS_ADDRESS'
export const GENERATE_QR_CODE = 'GENERATE_QR_CODE'
export const RECEIVE_FUNDS = 'RECEIVE_FUNDS'

export const OPEN_CONVERT_FUNDS_MODAL = 'OPEN_CONVERT_FUNDS_MODAL'
export const CLOSE_CONVERT_FUNDS_MODAL = 'CLOSE_CONVERT_FUNDS_MODAL'
export const SET_CONVERT_FUNDS_FROM_AMOUNT = 'SET_CONVERT_FUNDS_FROM_AMOUNT'
export const SET_CONVERT_FUNDS_FROM_SYMBOL = 'SET_CONVERT_FUNDS_FROM_SYMBOL'
export const SET_CONVERT_FUNDS_FROM_ACCOUNT = 'SET_CONVERT_FUNDS_FROM_ACCOUNT'
export const SET_CONVERT_FUNDS_TO_AMOUNT = 'SET_CONVERT_FUNDS_TO_AMOUNT'
export const SET_CONVERT_FUNDS_TO_SYMBOL = 'SET_CONVERT_FUNDS_TO_SYMBOL'
export const SET_CONVERT_FUNDS_TO_ACCOUNT = 'SET_CONVERT_FUNDS_TO_ACCOUNT'
export const CONVERT_FUNDS = 'CONVERT_FUNDS'

/**
 * Send Funds
 */
export function openSendFundsModal(accountIndex) {
  return {
    type: OPEN_SEND_FUNDS_MODAL,
    accountIndex,
  }
}

export function closeSendFundsModal() {
  return {
    type: CLOSE_SEND_FUNDS_MODAL,
  }
}

export function setSendFundsAddress(address) {
  return {
    type: SET_SEND_FUNDS_ADDRESS,
    address,
  }
}

export function setSendFundsAmount(amount) {
  return {
    type: SET_SEND_FUNDS_AMOUNT,
    amount,
  }
}

export function setSendFundsSymbol(symbol) {
  return {
    type: SET_SEND_FUNDS_SYMBOL,
    symbol,
  }
}

export function setSendFundsAccount(account) {
  return {
    type: SET_SEND_FUNDS_ACCOUNT,
    account,
  }
}

export function setSendFundsGas(gas) {
  return {
    type: SET_SEND_FUNDS_GAS,
    gas,
  }
}

export function setSendFundsGasPrice(gasPrice) {
  return {
    type: SET_SEND_FUNDS_GAS_PRICE,
    gasPrice,
  }
}

export function setSendFundsGasSymbol(gasSymbol) {
  return {
    type: SET_SEND_FUNDS_GAS_SYMBOL,
    gasSymbol,
  }
}

export function setSendFundsPincode(pincode) {
  return {
    type: SET_SEND_FUNDS_PINCODE,
    pincode,
  }
}

export function setSendFundsIsPincodeIncorrect(isPincodeIncorrect = true) {
  return {
    type: SET_SEND_FUNDS_IS_PINCODE_INCORRECT,
    isPincodeIncorrect,
  }
}

export function typeSendFundsPincode(isTypingOfPincode = true) {
  return {
    type: TYPE_SEND_FUNDS_PINCODE,
    isTypingOfPincode,
  }
}

export function sendFunds() {
  return {
    type: SEND_FUNDS,
  }
}

/**
 * Receive Funds
 */
export function openReceiveFundsModal(accountIndex) {
  return {
    type: OPEN_RECEIVE_FUNDS_MODAL,
    accountIndex,
  }
}

export function closeReceiveFundsModal() {
  return {
    type: CLOSE_RECEIVE_FUNDS_MODAL,
  }
}

export function setReceiveFundsAmount(amount) {
  return {
    type: SET_RECEIVE_FUNDS_AMOUNT,
    amount,
  }
}

export function setReceiveFundsSymbol(symbol) {
  return {
    type: SET_RECEIVE_FUNDS_SYMBOL,
    symbol,
  }
}

export function setReceiveFundsAccount(account) {
  return {
    type: SET_RECEIVE_FUNDS_ACCOUNT,
    account,
  }
}

export function setReceiveFundsAddress(address) {
  return {
    type: SET_RECEIVE_FUNDS_ADDRESS,
    address,
  }
}

export function generateQRCode(address) {
  return {
    type: GENERATE_QR_CODE,
    address,
  }
}

/**
 * Convert Funds
 */
export function openConvertFundsModal(accountIndex) {
  return {
    type: OPEN_CONVERT_FUNDS_MODAL,
    accountIndex,
  }
}

export function closeConvertFundsModal() {
  return {
    type: CLOSE_CONVERT_FUNDS_MODAL,
  }
}

export function setConvertFundsFromAmount(amount) {
  return {
    type: SET_CONVERT_FUNDS_FROM_AMOUNT,
    amount,
  }
}

export function setConvertFundsFromSymbol(symbol) {
  return {
    type: SET_CONVERT_FUNDS_FROM_SYMBOL,
    symbol,
  }
}

export function setConvertFundsFromAccount(account) {
  return {
    type: SET_CONVERT_FUNDS_FROM_ACCOUNT,
    account,
  }
}

export function setConvertFundsToAmount(amount) {
  return {
    type: SET_CONVERT_FUNDS_TO_AMOUNT,
    amount,
  }
}

export function setConvertFundsToSymbol(symbol) {
  return {
    type: SET_CONVERT_FUNDS_TO_SYMBOL,
    symbol,
  }
}

export function setConvertFundsToAccount(account) {
  return {
    type: SET_CONVERT_FUNDS_TO_ACCOUNT,
    account,
  }
}

export function convertFunds() {
  return {
    type: CONVERT_FUNDS,
  }
}

const ACTION_HANDLERS = {
  /**
   * Send Funds
   */
  [OPEN_SEND_FUNDS_MODAL]: state => ({
    ...state,
    isSendFundsModalOpen: true,
  }),
  [CLOSE_SEND_FUNDS_MODAL]: state => ({
    ...state,
    isSendFundsModalOpen: false,
  }),
  [SET_SEND_FUNDS_ADDRESS]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      address: action.address,
    },
  }),
  [SET_SEND_FUNDS_AMOUNT]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      amount: action.amount,
    },
  }),
  [SET_SEND_FUNDS_SYMBOL]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      symbol: action.symbol,
    },
  }),
  [SET_SEND_FUNDS_ACCOUNT]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      account: action.account,
    },
  }),
  [SET_SEND_FUNDS_GAS]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      gas: action.gas,
    },
  }),
  [SET_SEND_FUNDS_GAS_PRICE]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      gasPrice: action.gasPrice,
    },
  }),
  [SET_SEND_FUNDS_GAS_SYMBOL]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      gasSymbol: action.gasSymbol,
    },
  }),
  [SET_SEND_FUNDS_PINCODE]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      pincode: action.pincode,
    },
  }),
  [SET_SEND_FUNDS_IS_PINCODE_INCORRECT]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      isPincodeIncorrect: !!action.isPincodeIncorrect,
    },
  }),
  [TYPE_SEND_FUNDS_PINCODE]: (state, action) => ({
    ...state,
    sendFormData: {
      ...state.sendFormData,
      isTypingOfPincode: !!action.isTypingOfPincode,
    },
  }),
  [SEND_FUNDS]: state => ({
    ...state,
  }),
  /**
   * Receive Funds
   */
  [OPEN_RECEIVE_FUNDS_MODAL]: state => ({
    ...state,
    isReceiveFundsModalOpen: true,
  }),
  [CLOSE_RECEIVE_FUNDS_MODAL]: state => ({
    ...state,
    isReceiveFundsModalOpen: false,
  }),
  [SET_RECEIVE_FUNDS_AMOUNT]: (state, action) => ({
    ...state,
    receiveFormData: {
      ...state.receiveFormData,
      amount: action.amount,
    },
  }),
  [SET_RECEIVE_FUNDS_SYMBOL]: (state, action) => ({
    ...state,
    receiveFormData: {
      ...state.receiveFormData,
      symbol: action.symbol,
    },
  }),
  [SET_RECEIVE_FUNDS_ACCOUNT]: (state, action) => ({
    ...state,
    receiveFormData: {
      ...state.receiveFormData,
      account: action.account,
    },
  }),
  [SET_RECEIVE_FUNDS_ADDRESS]: (state, action) => ({
    ...state,
    receiveFormData: {
      ...state.receiveFormData,
      address: action.address,
    },
  }),
  [RECEIVE_FUNDS]: state => ({
    ...state,
  }),
  /**
   * Convert Funds
   */
  [OPEN_CONVERT_FUNDS_MODAL]: state => ({
    ...state,
    isConvertFundsModalOpen: true,
  }),
  [CLOSE_CONVERT_FUNDS_MODAL]: state => ({
    ...state,
    isConvertFundsModalOpen: false,
  }),
  [SET_CONVERT_FUNDS_FROM_AMOUNT]: (state, action) => ({
    ...state,
    convertFormData: {
      ...state.convertFormData,
      from: {
        ...state.convertFormData.from,
        amount: action.amount,
      },
    },
  }),
  [SET_CONVERT_FUNDS_FROM_SYMBOL]: (state, action) => ({
    ...state,
    convertFormData: {
      ...state.convertFormData,
      from: {
        ...state.convertFormData.from,
        symbol: action.symbol,
      },
    },
  }),
  [SET_CONVERT_FUNDS_FROM_ACCOUNT]: (state, action) => ({
    ...state,
    convertFormData: {
      ...state.convertFormData,
      from: {
        ...state.convertFormData.from,
        account: action.account,
      },
    },
  }),
  [SET_CONVERT_FUNDS_TO_AMOUNT]: (state, action) => ({
    ...state,
    convertFormData: {
      ...state.convertFormData,
      to: {
        ...state.convertFormData.to,
        amount: action.amount,
      },
    },
  }),
  [SET_CONVERT_FUNDS_TO_SYMBOL]: (state, action) => ({
    ...state,
    convertFormData: {
      ...state.convertFormData,
      to: {
        ...state.convertFormData.to,
        symbol: action.symbol,
      },
    },
  }),
  [SET_CONVERT_FUNDS_TO_ACCOUNT]: (state, action) => ({
    ...state,
    convertFormData: {
      ...state.convertFormData,
      to: {
        ...state.convertFormData.to,
        account: action.account,
      },
    },
  }),
  [CONVERT_FUNDS]: state => ({
    ...state,
  }),
}

const initialState = {
  sendFormData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    address: '',
    amount: '',
    symbol: 'ETH',
    account: '',
    gas: '',
    gasPrice: '',
    gasSymbol: 'ETH',
    pincode: '',
    isPincodeIncorrect: false,
    isTypingOfPincode: false,
  },
  receiveFormData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    amount: '0',
    symbol: 'ETH',
    account: '',
    address: '',
  },
  convertFormData: {
    from: {
      amount: '',
      symbol: 'ETH',
      account: '',
    },
    to: {
      amount: '',
      symbol: 'ETH',
      account: '',
    },
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
  },
  isSendFundsModalOpen: false,
  isReceiveFundsModalOpen: false,
  isConvertFundsModalOpen: false,
}

export default function funds(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
