// @flow

export type LanguageCode = 'en' |
  'ru' |
  'ko' |
  'ja' |
  'zh-Hans' |
  'zh-Hant' |
  'es'

export type LanguageInfo = {
  title: string,
  code: LanguageCode,
  iconName: string,
  isDisabled: boolean,
}

export type LanguagesMap = {
  [code: LanguageCode]: LanguageInfo,
}

const LANGUAGES_CONFIG: LanguageInfo[] = [
  {
    title: 'English',
    code: 'en',
    iconName: 'ic_english_24',
    isDisabled: false,
  },
  {
    title: 'Русский',
    code: 'ru',
    iconName: 'ic_russia_24',
    isDisabled: false,
  },
  {
    // TODO: translate to korean
    title: 'Korean',
    code: 'ko',
    iconName: 'ic_korean_24',
    isDisabled: false,
  },
  {
    // TODO: translate to Chinese Simplified
    title: 'Chinese Simplified',
    code: 'zh-Hans',
    iconName: 'ic_chinese_simplified_24',
    isDisabled: false,
  },
  {
    // TODO: translate to Chinese Traditional
    title: 'Chinese Traditional',
    code: 'zh-Hant',
    iconName: 'ic_chinese_traditional_24',
    isDisabled: false,
  },
  {
    // TODO: translate to Japan
    title: 'Japan',
    code: 'ja',
    iconName: 'ic_japan_24',
    isDisabled: false,
  },
  {
    // TODO: translate to Spanish
    title: 'Spanish',
    code: 'es',
    iconName: 'ic_spain_24',
    isDisabled: false,
  },
]

export const LANGUAGES: LanguageInfo[] = LANGUAGES_CONFIG
  .filter((lang: LanguageInfo) => !lang.isDisabled)

export const LANGUAGES_MAP: LanguagesMap = LANGUAGES.reduce((res, cur) => ({
  ...res,
  [cur.code]: cur,
}), {})
