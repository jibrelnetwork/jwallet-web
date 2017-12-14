import { put, select, takeEvery } from 'redux-saga/effects'

import storage from 'services/storage'

import { LANGUAGE_SET } from '../modules/i18n'

function onSetLanguage({ languageCode }) {
  storage.setI18n(languageCode)

  const { origin, pathname } = window.location
  window.location.href = `${origin}${pathname}?lang=${languageCode}`
}

export function* watchSetLanguage() {
  yield takeEvery(LANGUAGE_SET, onSetLanguage)
}
