// @flow strict

import React from 'react'
import { t } from 'ttag'

import { ESCButton } from 'components'
import { JText } from 'components/base'

import styles from './headerPanel.m.scss'

type Props = {|
  isLoading: boolean,
  goToPrevStep: Function,
  currentStep: number,
|}

function HeaderPanel({
  isLoading,
  currentStep,
  goToPrevStep,
}: Props) {
  return (
    <div className={styles.headerPanel}>
      <div className={styles.container}>
        <JText
          size='tab'
          color='gray'
          value={t`Send asset`}
        />
        <div className={styles.actions}>
          <ESCButton
            onESC={goToPrevStep}
            iconName={(currentStep === 1) ? 'padding-cross' : 'arrow-left'}
            color='gray'
            isDisabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default HeaderPanel
