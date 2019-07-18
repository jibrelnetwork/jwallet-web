// @flow

import { useContext } from 'react'

import { LanguageContext } from './LanguageProvider'

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useI18n() {
  const { i18n } = useContext(LanguageContext)

  return i18n
}
