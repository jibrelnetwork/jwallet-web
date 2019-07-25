// @flow

import React from 'react'

import { UserActionInfo } from 'components'
import { JLink } from 'components/base'
import { useI18n } from 'app/hooks'

import style from './notFound.m.scss'

export function NotFound() {
  const i18n = useI18n()

  return (
    <div className={style.core}>
      <div className={style.center}>
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
          iconClassName={style.icon}
          iconName='ic_attention_48-use-fill'
        />
        <JLink
          theme='button-general-confirm'
          className={style.button}
          href='/'
        >
          {i18n._(
            'NotFound.goHome',
            null,
            { defaults: 'Go to Home' },
          )}
        </JLink>
      </div>
    </div>
  )
}
