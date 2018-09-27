// @flow

import config from 'config'
import storage from 'services/storage'

// declare function isSupportedLanguage(lang: string):
//   boolean %checks(typeof lang === LanguageCode)

function isSupportedLanguage(lang: mixed): boolean %checks {
  return config.supportedLanguages.includes(lang)
}

function getCurrentLanguageCode(): LanguageCode {
  const i18nLangFromQuery: string = (/lang=([a-z]{2})/ig.exec(window.location.href) || [])[1]
  const i18nLangFromStorage: string = storage.getI18n()

  if (isSupportedLanguage(i18nLangFromQuery)) {
    return i18nLangFromQuery
  }

  if (isSupportedLanguage(i18nLangFromStorage)) {
    return i18nLangFromStorage
  }

  return 'en'
}

export default getCurrentLanguageCode
