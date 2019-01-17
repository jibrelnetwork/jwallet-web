// @flow

export const INIT: '@@settings/INIT' = '@@settings/INIT'
export const CHANGE_PAYMENT_PASSWORD: '@@settings/CHANGE_PAYMENT_PASSWORD' =
  '@@settings/CHANGE_PAYMENT_PASSWORD'
export const VALIDATION_PASSWORD_FORM: '@@settings/VALIDATION_PASSWORD_FORM' =
  '@@settings/VALIDATION_PASSWORD_FORM'

export function init() {
  return {
    type: INIT,
  }
}

export function changePaymentPassword(payload: PaymentPasswordForm) {
  return {
    type: CHANGE_PAYMENT_PASSWORD,
    payload,
  }
}

export function validationPasswordForm(payload: Object) {
  return {
    type: VALIDATION_PASSWORD_FORM,
    payload,
  }
}

export type SettingsAction =
  ExtractReturn<typeof init> |
  ExtractReturn<typeof changePaymentPassword> |
  ExtractReturn<typeof validationPasswordForm>

const initialState: SettingsState = {
  localCurrencyCode: 'USD',
  defaultGasPrice: '30000',
  systemLanguageCode: 'en',
  hasPinCode: false,
  passwordForm: {
    values: {
      passwordOld: '',
      passwordNew: '',
      passwordNewConfirm: '',
      passwordHint: '',
    },
    messages: {},
  },
}

const settings = (
  state: SettingsState = initialState,
  action: SettingsAction,
): SettingsState => {
  switch (action.type) {
    case INIT:
      return state
    case CHANGE_PAYMENT_PASSWORD:
      return {
        ...state,
        passwordForm: {
          values: action.payload,
          messages: state.passwordForm.messages,
        },
      }
    case VALIDATION_PASSWORD_FORM:
      return {
        ...state,
        passwordForm: {
          values: state.passwordForm.values,
          messages: action.payload,
        },
      }
    default:
      return state
  }
}

export default settings
