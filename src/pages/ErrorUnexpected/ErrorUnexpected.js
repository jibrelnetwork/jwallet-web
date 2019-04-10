// @flow

import React from 'react'
import classNames from 'classnames'
import {
  t,
  jt,
} from 'ttag'

import {
  JIcon,
  JLink,
  JRaisedButton,
} from 'components/base'

import errorUnexpectedStyle from './errorUnexpected.m.scss'

const handleReloadClick = () =>
  window.location.reload()

const HomePageLink = (
  <JLink
    href='/'
    theme='text-blue'
  >
    {t`home page`}
  </JLink>
)

const SupportLink = (
  <JLink
    href='https://jibrel.zendesk.com/hc/en-us/requests/new'
    theme='text-blue'
  >
    {t`contact support`}
  </JLink>
)

export function ErrorUnexpected() {
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
        {t`Unexpected Error`}
      </h1>
      <div className={errorUnexpectedStyle.description}>
        {
          jt`Something went wrong! Our developers already received error report,
            but you can also reload page, go to ${HomePageLink} or ${SupportLink}`
        }
      </div>
      <JRaisedButton
        onClick={handleReloadClick}
        className={errorUnexpectedStyle.button}
      >
        {t`Reload`}
      </JRaisedButton>
    </main>
  )
}
