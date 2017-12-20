import { takeEvery } from 'redux-saga/effects'

import { gtm, storage } from 'services'
import { LANGUAGE_SET } from '../modules/i18n'

function onSetLanguage({ languageCode }) {
  storage.setI18n(languageCode)

  gtm.pushChangeLanguage()

  const { origin, pathname } = window.location
  window.location.href = `${origin}${pathname}?lang=${languageCode}`
}

export function* watchSetLanguage() { // eslint-disable-line import/prefer-default-export
  yield takeEvery(LANGUAGE_SET, onSetLanguage)
}
