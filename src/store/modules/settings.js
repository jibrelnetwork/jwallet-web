// @flow

import { type CurrencyFormFieldValues } from 'routes/Settings/routes/Currency/types'

export const CHANGE_PAYMENT_PASSWORD = '@@settings/CHANGE_PAYMENT_PASSWORD'
export const VALIDATION_PASSWORD_FORM = '@@settings/VALIDATION_PASSWORD_FORM'
export const CHANGE_PAYMENT_PASSWORD_PENDING = '@@settings/CHANGE_PAYMENT_PASSWORD_PENDING'

export const SET_FIAT_CURRENCY = '@@settings/SET_FIAT_CURRENCY'

export const CLEAN = '@@settings/CLEAN'

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

export function setFiatCurrency(payload: CurrencyFormFieldValues) {
  return {
    type: SET_FIAT_CURRENCY,
    payload,
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type SettingsAction =
  ExtractReturn<typeof changePaymentPassword> |
  ExtractReturn<typeof changePaymentPasswordPending> |
  ExtractReturn<typeof validationPasswordForm> |
  ExtractReturn<typeof setFiatCurrency> |
  ExtractReturn<typeof clean>

const initialState: SettingsState = {
  persist: {
    fiatCurrency: 'USD',
    systemLanguageCode: 'en',
    hasPinCode: false,
  },
  passwordForm: {
    isLoading: false,
    messages: {},
  },
}

function settings(state: SettingsState = initialState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case SET_FIAT_CURRENCY:
      return {
        ...state,
        persist: {
          ...state.persist,
          fiatCurrency: action.payload.fiatCurrency,
        },
      }

    case VALIDATION_PASSWORD_FORM:
      return {
        ...state,
        passwordForm: {
          ...state.passwordForm,
          messages: action.payload,
        },
      }

    case CHANGE_PAYMENT_PASSWORD_PENDING:
      return {
        ...state,
        passwordForm: {
          ...state.passwordForm,
          isLoading: action.payload,
        },
      }

    case CLEAN:
      return {
        ...initialState,
        persist: state.persist,
      }

    default:
      return state
  }
}

export default settings
