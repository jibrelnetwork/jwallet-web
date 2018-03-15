// @flow

export const LANGUAGE_SET = 'LANGUAGE_SET'

export function setLanguage(languageCode: string) {
  return {
    type: LANGUAGE_SET,
    languageCode,
  }
}
