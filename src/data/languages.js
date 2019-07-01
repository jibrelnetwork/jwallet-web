// @flow strict

export const LANGUAGES = {
  en: {
    title: 'English',
  },
  ru: {
    title: 'Русский',
  },
  ko: {
    title: 'Korean',
  },
  'zh-Hans': {
    title: 'Chinese Simplified',
  },
  'zh-Hant': {
    title: 'Chinese Traditional',
  },
  ja: {
    title: 'Japan',
  },
  es: {
    title: 'Spanish',
  },
}

export type LanguageCode = $Keys<typeof LANGUAGES>

export type Languages = {
  [code: LanguageCode]: {
    title: string,
  },
}
