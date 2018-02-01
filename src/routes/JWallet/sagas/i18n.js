// @flow

import { takeEvery } from 'redux-saga/effects'

import { gtm, storage } from 'services'
import { LANGUAGE_SET } from '../modules/i18n'

function onSetLanguage(action: { languageCode: string }) {
  const { languageCode } = action
  storage.setI18n(languageCode)

  gtm.pushChangeLanguage(languageCode)

  const { origin, pathname } = window.location
  window.location.href = `${origin}${pathname}?lang=${languageCode}`
}

// eslint-disable-next-line import/prefer-default-export
export function* watchSetLanguage(): Saga<void> {
  yield takeEvery(LANGUAGE_SET, onSetLanguage)
}
