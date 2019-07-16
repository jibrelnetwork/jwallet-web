// @flow

import React from 'react'
import classNames from 'classnames'
import { useI18n } from 'app/hooks'
import { Trans } from '@lingui/react'

import {
  JIcon,
  JLink,
  Button,
} from 'components/base'

import errorUnexpectedStyle from './errorUnexpected.m.scss'

const handleReloadClick = () =>
  window.location.reload()

export function ErrorUnexpected() {
  const i18n = useI18n()

  /* eslint-disable max-len */
  return (
    <main
      className={classNames(
        '__error',
        errorUnexpectedStyle.core,
      )}
    >
      <JIcon
        name='ic_attention_48-use-fill'
        className={errorUnexpectedStyle.icon}
      />
      <h1 className={errorUnexpectedStyle.title}>
        {i18n._(
          'ErrorUnexpected.title',
          null,
          { defaults: 'Unexpected Error' },
        )}
      </h1>
      <Trans className={errorUnexpectedStyle.description} id='ErrorUnexpected.description'>
        Something went wrong! Our developers already received error report, but you can also reload page, go to
        <JLink
          href='/'
          theme='text-blue'
          key='home'
        >
          home page
        </JLink> or
        <JLink
          href='https://jibrel.zendesk.com/hc/en-us/requests/new'
          theme='text-blue'
          key='support'
        >
          contact support
        </JLink>
      </Trans>
      <Button
        onClick={handleReloadClick}
        className={errorUnexpectedStyle.button}
      >
        {i18n._(
          'ErrorUnexpected.action.reload',
          null,
          { defaults: 'Reload' },
        )}
      </Button>
    </main>
  )
  /* eslint-enable max-len */
}
