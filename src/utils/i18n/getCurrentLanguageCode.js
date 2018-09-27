// @flow

import config from 'config'
import storage from 'services/storage'

function getCurrentLanguageCode(): string {
  const i18nLangFromQuery: string = (/lang=([a-z]{2})/ig.exec(window.location.href) || [])[1]
  const i18nLangFromStorage: string = storage.getI18n()

  const { supportedLanguages } = config
  const isSupportedFromQuery = supportedLanguages.includes(i18nLangFromQuery)
  const isSupportedFromStorage = supportedLanguages.includes(i18nLangFromStorage)

  if (isSupportedFromQuery) {
    return i18nLangFromQuery
  }

  if (isSupportedFromStorage) {
    return i18nLangFromStorage
  }

  return 'en'
}

export default getCurrentLanguageCode
