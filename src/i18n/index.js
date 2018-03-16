// @flow

import { path } from 'ramda'

import getCurrentLanguageCode from 'utils/getCurrentLanguageCode'

import en from './en'
import ko from './ko'
import zh from './zh'
import ja from './ja'

const i18nMap = { en, ko, zh, ja }

const i18n = () => {
  const i18nLang: LanguageCode = getCurrentLanguageCode()
  const i18nLibrary: Object = i18nMap[i18nLang] || en

  return ((value: string) => path(value.split('.'))(i18nLibrary))
}

export default i18n
