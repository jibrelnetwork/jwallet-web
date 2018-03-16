// @flow

import config from 'config'
import storage from 'services/storage'

const getCurrentLanguageCode = (): LanguageCode => {
  const i18nLangFromQuery: ?LanguageCode = (/lang=([a-z]{2})/ig.exec(window.location.href) || [])[1]
  const i18nLangFromStorage: ?LanguageCode = storage.getI18n()
  const i18nLang: ?LanguageCode = i18nLangFromQuery || i18nLangFromStorage

  if (!i18nLang) {
    return 'en'
  }

  const isSupported = config.supportedLanguages.includes(i18nLang)

  return isSupported ? i18nLang : 'en'
}

export default getCurrentLanguageCode
