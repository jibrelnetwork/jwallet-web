// @flow strict

import {
  type LanguageCode,
} from 'data/languages'

import {
  type IDBPObjectStore,
} from 'idb'

import {
  type DBType,
} from '.'

export async function storeLang(
  db: IDBPObjectStore<DBType>,
  lang: LanguageCode,
) {
  return db.put('Lang', lang, 'lang')
}

export async function getStoredLang(
  db: IDBPObjectStore<DBType>,
) {
  return db.get('Lang', 'lang')
}
