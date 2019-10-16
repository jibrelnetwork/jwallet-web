// @flow strict

import {
  type LanguageCode,
} from 'data/languages'

import {
  type LanguageStore,
} from '.'

export async function storeLang(
  db: LanguageStore,
  lang: LanguageCode,
) {
  return db.put('Lang', lang, 'lang')
}

export async function getStoredLang(
  db: LanguageStore,
) {
  return db.get('Lang', 'lang')
}
