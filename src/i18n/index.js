import at from 'lodash/at'

import storage from 'services/storage'

import en from './en'
import ja from './ja'
import ko from './ko'

const i18nMap = { en, ja, ko }

export default function i18n() {
  const i18nLanguageFromQuery = (/lang=([a-z]{2})/ig.exec(window.location.href) || [])[1]
  const i18nLanguageFromStorage = storage.getI18n()
  const i18nLanguage = i18nLanguageFromQuery || i18nLanguageFromStorage
  const i18nLibrary = i18nMap[i18nLanguage] || en

  return (path => at(i18nLibrary, path)[0])
}
