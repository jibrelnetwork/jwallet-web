// @flow

import config from 'config'

function getCurrentLanguageCode(): string {
  const i18nLangFromQuery: string = (/lang=([a-z]{2})/ig.exec(window.location.href) || [])[1]

  const isSupportedFromQuery = config.supportedLanguages.includes(i18nLangFromQuery)

  if (isSupportedFromQuery) {
    return i18nLangFromQuery
  }

  return 'en'
}

export default getCurrentLanguageCode
