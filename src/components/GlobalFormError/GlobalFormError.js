// @flow strict

import React from 'react'

import styles from './globalFormError.m.scss'

type Props = {|
  +text: string,
  +title: string,
|}

export function GlobalFormError({
  text,
  title,
}: Props) {
  return (
    <div className={`__global-form-error ${styles.core}`}>
      {title && (
        <div className={styles.title}>
          {title}
        </div>
      )}
      <div className={styles.text}>
        {text}
      </div>
    </div>
  )
}

GlobalFormError.defaultProps = {
  title: '',
}
