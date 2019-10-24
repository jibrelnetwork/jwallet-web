// @flow

import {
  DEFAULT_CURRENCY,
  type FiatCurrencyCode,
} from 'data/currencies'
import {
  DEFAULT_LANGUAGE,
  type LanguageCode,
} from 'data/languages'

export function selectUser(state: AppState): UserState {
  return state.user
}

export function selectIntroductionValue(state: AppState): boolean {
  return state.user.persist.isIntroductionPassed
}

export function selectAgreementsConditions(state: AppState) {
  return state.user.persist.agreementsConditions || {}
}

export function selectIsAgreementsConfirmed(state: AppState): boolean {
  return state.user.persist.isAgreementsConfirmed || false
}

export function selectLanguage(state: AppState): LanguageCode {
  const { language } = state.user.persist

  return language || DEFAULT_LANGUAGE
}

export function selectFiatCurrency(state: AppState): FiatCurrencyCode {
  const { fiatCurrency } = state.user.persist

  return fiatCurrency || DEFAULT_CURRENCY
}
