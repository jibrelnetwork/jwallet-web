// @flow

import React from 'react'
import classNames from 'classnames'
import {
  t,
} from 'ttag'

import {
  JIcon,
  Button,
} from 'components/base'

// shared styles with ValidationFailed
import style from './validationFailed.m.scss'

type Props = {|
  onGoBackClick: () => any,
  onCancelClick: () => any,
|}

export function SendError({
  onGoBackClick,
  onCancelClick,
}: Props) {
  return (
    <main
      className={classNames(
        '__send_error',
        style.core,
      )}
    >
      <JIcon
        name='ic_fail_48-use-fill'
        className={style.icon}
      />
      <h1 className={style.title}>
        {t`Internet Connection Error`}
      </h1>
      <div className={style.description}>
        {
          t`Transfer can't be processed without internet connection. Please, try again later.`
        }
      </div>
      <div className={style.buttons}>
        <Button
          onClick={onGoBackClick}
          className={style.button}
          theme='secondary'
        >
          {t`Go Back and Try Again`}
        </Button>
        <Button
          onClick={onCancelClick}
          className={style.button}
          theme='general'
        >
          {t`Cancel Transfer`}
        </Button>
      </div>
    </main>
  )
}
