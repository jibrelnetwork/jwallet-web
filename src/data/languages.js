// @flow strict

export const LANGUAGES = {
  en: {
    title: 'English',
  },
  ru: {
    title: 'Русский',
  },
  ko: {
    title: '한국어',
  },
  'zh-Hans': {
    title: '简体中文',
  },
  'zh-Hant': {
    title: '繁體中文',
  },
  ja: {
    title: '日本語',
  },
  es: {
    title: 'Español',
  },
}

export const DEFAULT_LANGUAGE = 'en'

export type LanguageCode = $Keys<typeof LANGUAGES>

export type Languages = {
  [code: LanguageCode]: {
    title: string,
  },
}
