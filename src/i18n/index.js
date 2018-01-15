import at from 'lodash/at'

import storage from 'services/storage'

import en from './en'
import zh from './zh'
import ko from './ko'
import ja from './ja'

const i18nMap = { en, zh, ko, ja }

export default function i18n() {
  const i18nLanguageFromQuery = (/lang=([a-z]{2})/ig.exec(window.location.href) || [])[1]
  const i18nLanguageFromStorage = storage.getI18n()
  const i18nLanguage = i18nLanguageFromQuery || i18nLanguageFromStorage
  const i18nLibrary = i18nMap[i18nLanguage] || en

  return (path => at(i18nLibrary, path)[0])
}
