// @flow

import type { CurrencyFormFieldValues } from '../routes/Currency/types'

export const INIT = '@@settings/INIT'
export const CHANGE_PAYMENT_PASSWORD = '@@settings/CHANGE_PAYMENT_PASSWORD'
export const VALIDATION_PASSWORD_FORM = '@@settings/VALIDATION_PASSWORD_FORM'
export const CHANGE_PAYMENT_PASSWORD_PENDING = '@@settings/CHANGE_PAYMENT_PASSWORD_PENDING'
export const CHANGE_LOCAL_CURRENCY = '@@settings/CHANGE_LOCAL_CURRENCY'

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

export function changePaymentPasswordPending(payload: boolean) {
  return {
    type: CHANGE_PAYMENT_PASSWORD_PENDING,
    payload,
  }
}

export function validationPasswordForm(payload: PaymentPasswordForm) {
  return {
    type: VALIDATION_PASSWORD_FORM,
    payload,
  }
}

export function changeLocalCurrencyCode(payload: CurrencyFormFieldValues) {
  return {
    type: CHANGE_LOCAL_CURRENCY,
    currencyCode: payload.currencyCode,
  }
}

export type SettingsAction =
  ExtractReturn<typeof init> |
  ExtractReturn<typeof changePaymentPassword> |
  ExtractReturn<typeof changePaymentPasswordPending> |
  ExtractReturn<typeof validationPasswordForm>

const initialState: SettingsState = {
  localCurrencyCode: 'USD',
  defaultGasPrice: '30000',
  systemLanguageCode: 'en',
  hasPinCode: false,
  passwordForm: {
    isLoading: false,
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
    case CHANGE_LOCAL_CURRENCY:
      return {
        ...state,
        localCurrencyCode: action.currencyCode,
      }
    case VALIDATION_PASSWORD_FORM:
      return {
        ...state,
        passwordForm: {
          isLoading: state.passwordForm.isLoading,
          messages: action.payload,
        },
      }
    case CHANGE_PAYMENT_PASSWORD_PENDING:
      return {
        ...state,
        passwordForm: {
          isLoading: action.payload,
          messages: state.passwordForm.messages,
        },
      }
    default:
      return state
  }
}

export default settings
