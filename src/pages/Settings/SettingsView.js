// @flow strict

import React from 'react'
import { t } from 'ttag'

import {
  LANGUAGES,
  CURRENCIES,
} from 'data'

import {
  JLink,
  Header,
} from 'components/base'

import styles from './settings.m.scss'
import { Card } from './components/Card/Card'

export type Props = {|
  +fiatCurrency: FiatCurrency,
  +language: LanguageCode,
  +isDeveloperMode: boolean,
|}

export function SettingsView({
  language,
  fiatCurrency,
  isDeveloperMode,
}: Props) {
  const languageTitle: string = LANGUAGES[language].title
  const currencyName: string = CURRENCIES[fiatCurrency].name

  return (
    <div className={styles.core}>
      <Header title={t`Settings`} />
      <div className={styles.cards}>
        <JLink
          className={styles.item}
          href='/settings/password'
        >
          <Card
            title={t`Change Security Password`}
            iconColor='blue'
            iconName='ic_security_password_24-use-fill'
          />
        </JLink>
        <JLink
          className={styles.item}
          href='/settings/language'
        >
          <Card
            title={t`Language`}
            description={languageTitle}
            iconName={`ic_${language}_24`}
          />
        </JLink>
        <JLink
          className={styles.item}
          href='/settings/currency'
        >
          <Card
            title={t`Currency`}
            description={currencyName}
            iconName={`ic_${fiatCurrency.toLowerCase()}_24-use-fill`}
            iconColor='blue'
          />
        </JLink>
        <JLink
          className={styles.item}
          href='/settings/development'
        >
          <Card
            title={t`Developer Mode`}
            description={isDeveloperMode ? t`Enabled` : t`Disabled`}
            iconColor='blue'
            iconName='ic_dev_mode_24-use-fill'
          />
        </JLink>
        <div className={styles.item} />
        <div className={styles.item} />
      </div>
    </div>
  )
}
