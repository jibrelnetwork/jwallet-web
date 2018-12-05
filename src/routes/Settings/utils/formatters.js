// @flow
import { LANGUAGES_MAP, CURRENCIES_MAP } from 'data/settings'

export function formatBoolean(value: boolean): string {
  return value ? 'Enabled' : 'Disabled'
}

export function formatLanguage(langCode: LanguageCode): string {
  return LANGUAGES_MAP[langCode] || LANGUAGES_MAP.en
}

export function formatCurrency(curCode: CurrencyCode): string {
  return CURRENCIES_MAP[curCode] || CURRENCIES_MAP.USD
}
