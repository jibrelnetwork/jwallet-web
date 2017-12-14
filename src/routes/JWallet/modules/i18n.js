export const LANGUAGE_SET = 'LANGUAGE_SET'

export function setLanguage(languageCode) {
  return {
    type: LANGUAGE_SET,
    languageCode,
  }
}
