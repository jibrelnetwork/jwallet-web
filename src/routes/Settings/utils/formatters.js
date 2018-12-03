// @flow

export function formatBoolean(value: boolean): string {
  return value ? 'Enabled' : 'Disabled'
}

export function formatLanguage(langCode: string): string {
  const languageMap = {
    en: 'English',
    kr: 'Korean',
  }

  return languageMap[langCode] || 'Language not found'
}

export function formatCurrency(curCode: string): string {
  const currencyCode = {
    usd: 'US Dollar',
    rub: 'Russian Ruble',
  }

  return currencyCode[curCode.toLowerCase()] || 'Currency not found'
}
