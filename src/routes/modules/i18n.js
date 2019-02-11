// @flow

export const SET_LANGUAGE = '@@i18n/SET_LANGUAGE'

export const setLanguage = (languageCode: LanguageCode): {
  type: string,
  payload: {
    languageCode: LanguageCode,
  },
} => ({
  type: SET_LANGUAGE,
  payload: {
    languageCode,
  },
})
