// @flow strict

import * as React from 'react'
import { t } from 'ttag'

import {
  JIcon,
  JFlatButton,
  JText,
} from 'components/base'

import styles from './errorMessage.m.scss'

type Props = {|
  goBack: () => void,
  errorMessage: string,
|}

function ErrorMessage({
  goBack, errorMessage,
}: Props) {
  return (
    <div className={styles.error}>
      <div className={styles.icon}>
        <JIcon name='alert' size='medium' color='white' />
      </div>
      <div className={styles.text}>
        <JText value={errorMessage} color='white' size='semismall' whiteSpace='wrap' />
      </div>
      <div className={styles.button}>
        <JFlatButton
          onClick={goBack}
          label={t`Change parameters`}
          isBordered
        />
      </div>
    </div>
  )
}

export default ErrorMessage
