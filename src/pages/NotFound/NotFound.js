// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { JLink } from 'components/base'
import { UserActionInfo } from 'components'

import styles from './notFound.m.scss'

export function NotFound() {
  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <div className={styles.center}>
        <UserActionInfo
          title={i18n._(
            'NotFound.title',
            null,
            { defaults: '404. Page Not Found' },
          )}
          text={i18n._(
            'NotFound.description',
            null,
            {
              defaults:
                'The page you\'re looking for can\'t be found. Check the URL and try again.',
            },
          )}
          iconClassName={styles.icon}
          iconName='ic_attention_48-use-fill'
        />
        <div className={styles.button}>
          <JLink
            href='/'
            theme='button-general-confirm'
          >
            {i18n._(
              'NotFound.goHome',
              null,
              { defaults: 'Go to Home' },
            )}
          </JLink>
        </div>
      </div>
    </div>
  )
}
