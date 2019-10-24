// @flow

import {
  addLocale,
  useLocale,
} from 'ttag'

import translationEn from './en.json'

const locale = 'en'

addLocale(locale, translationEn)
useLocale(locale)
