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
    title: '体中文',
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

export type LanguageCode = $Keys<typeof LANGUAGES>

export type Languages = {
  [code: LanguageCode]: {
    title: string,
  },
}
