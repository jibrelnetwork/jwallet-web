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

import style from './validationFailed.m.scss'

type Props = {|
  onGoBackClick: () => any,
  onGoNextClick: () => any,
|}

export function ValidationFailed({
  onGoBackClick,
  onGoNextClick,
}: Props) {
  return (
    <main
      className={classNames(
        '__validation_failed',
        style.core,
      )}
    >
      <JIcon
        name='ic_fail_48-use-fill'
        className={style.icon}
      />
      <h1 className={style.title}>
        {t`Validation failed`}
      </h1>
      <div className={style.description}>
        {
          t`Transfer validation failed. Chances are that if you proceed, transfer won't be wired,
          but the blockchain fee will be charged. Are you sure you want to proceed?`
        }
      </div>
      <div className={style.buttons}>
        <Button
          onClick={onGoNextClick}
          className={style.button}
          theme='secondary'
        >
          {t`Proceed Anyway`}
        </Button>
        <Button
          onClick={onGoBackClick}
          className={style.button}
          theme='general'
        >
          {t`Change Transfer Details`}
        </Button>
      </div>
    </main>
  )
}
