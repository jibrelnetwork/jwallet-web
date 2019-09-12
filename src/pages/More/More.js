// @flow strict

import React from 'react'
import { type I18n } from '@lingui/core'

import { Card } from 'components'
import { useI18n } from 'app/hooks'

import {
  JLink,
  Header,
} from 'components/base'

import styles from './more.m.scss'

export type Props = {|
  +fiatCurrency: FiatCurrency,
  +isDeveloperMode: boolean,
|}

export function More() {
  const i18n: I18n = useI18n()

  return (
    <div className={styles.core}>
      <Header
        title={i18n._(
          'More.title',
          null,
          { defaults: 'More' },
        )}
      />
      <div className={styles.cards}>
        <div className={styles.item}>
          <Card
            title={i18n._(
              'More.action.sign',
              null,
              { defaults: 'Sign Message' },
            )}
            iconColor='blue'
            iconName='ic_sign_message_24-use-fill'
            isDisabled
          />
        </div>
        <div className={styles.item}>
          <Card
            title={i18n._(
              'More.action.verify',
              null,
              { defaults: 'Verify Signature' },
            )}
            iconName='ic_verify_signature_24-use-fill'
            iconColor='blue'
            isDisabled
          />
        </div>
        <JLink
          className={styles.item}
          href='https://jibrel.zendesk.com/hc/en-us/requests/new'
        >
          <Card
            title={i18n._(
              'More.action.support',
              null,
              { defaults: 'Support' },
            )}
            iconName='ic_support_24-use-fill'
            iconColor='blue'
          />
        </JLink>
        <div className={styles.item}>
          <Card
            title={i18n._(
              'More.action.about',
              null,
              { defaults: 'Information' },
            )}
            description={i18n._(
              'More.description.about',
              null,
              { defaults: 'About Jibrel Wallet' },
            )}
            iconColor='blue'
            iconName='ic_info_24-use-fill'
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
