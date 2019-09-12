// @flow strict

import React from 'react'
import classNames from 'classnames'

import { JIcon } from 'components/base'

import styles from './card.m.scss'

type CardIconColor = 'black' | 'blue'
type CardTitleColor = 'black' | 'blue'

type Props = {|
  +title: string,
  +iconName: string,
  +description: ?string,
  +iconColor: ?CardIconColor,
  +titleColor: CardTitleColor,
  +isDisabled: boolean,
|}

export function Card({
  title,
  iconName,
  iconColor,
  titleColor,
  description,
  isDisabled,
}: Props) {
  return (
    <div className={classNames(styles.core, isDisabled && styles.disabled)}>
      <div className={classNames(styles.icon, iconColor && styles[iconColor])}>
        <JIcon name={iconName} />
      </div>
      <div className={classNames(styles.title, styles[titleColor])}>
        {title}
      </div>
      {description && (
        <div className={styles.description}>
          {description}
        </div>
      )}
    </div>
  )
}

Card.defaultProps = {
  iconColor: null,
  description: null,
  titleColor: 'black',
  isDisabled: false,
}
