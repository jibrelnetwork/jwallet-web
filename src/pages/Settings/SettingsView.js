// @flow strict

import React from 'react'

import {
  LANGUAGES,
  CURRENCIES,
} from 'data'

import {
  JLink,
  Header,
} from 'components/base'

import { useLanguage } from 'app/hooks'

import styles from './settings.m.scss'
import { Card } from './components/Card/Card'

export type Props = {|
  +fiatCurrency: FiatCurrency,
  +isDeveloperMode: boolean,
|}

export function SettingsView({
  fiatCurrency,
  isDeveloperMode,
}: Props) {
  const {
    i18n,
    language,
  } = useLanguage()

  const languageTitle: string = LANGUAGES[language].title
  const currencyName: string = CURRENCIES[fiatCurrency].name

  return (
    <div className={styles.core}>
      <Header title={i18n._('Settings.title', null, { defaults: 'Settings' })} />
      <div className={styles.cards}>
        <JLink
          className={styles.item}
          href='/settings/password'
        >
          <Card
            title={i18n._(
              'Settings.actions.password',
              null,
              { defaults: 'Change Security Password' },
            )}
            iconColor='blue'
            iconName='ic_security_password_24-use-fill'
          />
        </JLink>
        <JLink
          className={styles.item}
          href='/settings/language'
        >
          <Card
            title={i18n._(
              'Settings.actions.language',
              null,
              { defaults: 'Language' },
            )}
            description={languageTitle}
            iconName={`ic_${language}_24`}
          />
        </JLink>
        <JLink
          className={styles.item}
          href='/settings/currency'
        >
          <Card
            title={i18n._('Settings.actions.currency', null, { defaults: 'Currency' })}
            description={currencyName}
            iconName={`ic_${fiatCurrency.toLowerCase()}_24-use-fill`}
            iconColor='blue'
          />
        </JLink>
        <div className={styles.item}>
          <Card
            title={i18n._('Settings.actions.devmode', null, { defaults: 'Developer Mode' })}
            description={isDeveloperMode
              ? i18n._('Settings.actions.devmode.enabled', null, { defaults: 'Enabled' })
              : i18n._('Settings.actions.devmode.disabled', null, { defaults: 'Disabled' })}
            iconColor='blue'
            iconName='ic_dev_mode_24-use-fill'
            isDisabled
          />
        </div>
        {
          /**
           * Empty divs below are necessary to align items (3 per row)
           * On screen resizing, they all should have the same width
           */
        }
        <div className={styles.item} />
        <div className={styles.item} />
      </div>
    </div>
  )
}
