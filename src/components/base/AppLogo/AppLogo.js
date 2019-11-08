// @flow strict

import React from 'react'
import { type I18n } from '@lingui/core'

import { useI18n } from 'app/hooks'
import svgLogoBlue from 'public/assets/logo/logo-blue.svg'
import svgLogoWhite from 'public/assets/logo/logo-white.svg'

import styles from './appLogo.m.scss'

type AppLogoColor = 'white' | 'blue'

type Props = {|
  +color: AppLogoColor,
|}

export default function AppLogo({ color }: Props) {
  const i18n: I18n = useI18n()

  return (
    <img
      alt={i18n._(
        'common.AppLogo.logo.alt',
        null,
        { defaults: 'Jwallet Logo' },
      )}
      src={(color === 'white') ? svgLogoWhite : svgLogoBlue}
      className={styles.core}
      width='136'
      height='48'
    />
  )
}

AppLogo.defaultProps = {
  color: 'white',
}
