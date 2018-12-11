// @flow

import { LANGUAGES_MAP } from 'data/settings'

export default function formatLanguage(langCode: LanguageCode): string {
  return LANGUAGES_MAP[langCode] || LANGUAGES_MAP.en
}
