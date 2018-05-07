// @flow

import { path } from 'ramda'

import getCurrentLanguageCode from 'utils/i18n/getCurrentLanguageCode'

import en from './en'
import ko from './ko'
import zh from './zh'
import ja from './ja'

const i18nMap = { en, ko, zh, ja }

const init: Function = (i18nLibrary: Object): Function => (value: string): string => {
  const libraryValue: ?string = path(value.split('.'))(i18nLibrary)
  const enValue: ?string = path(value.split('.'))(i18nLibrary)

  return libraryValue || enValue || value
}

const i18n: Function = (): Function => {
  const i18nLang: LanguageCode = getCurrentLanguageCode()
  const i18nLibrary: Object = i18nMap[i18nLang] || en

  return init(i18nLibrary)
}

export default i18n
