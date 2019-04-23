// @flow strict

import * as React from 'react'

import {
  JIcon,
  type JIconColor,
} from 'components/base/JIcon/JIcon'

import defaultItemStyles from './defaultItem.m.scss'

type Props = {
  +title: string,
  +description: string,
  +iconName: string,
  +iconColor: JIconColor,
}

function DefaultItem({
  title,
  description,
  iconName,
  iconColor,
}: Props) {
  return (
    <div className={defaultItemStyles.core}>
      {iconName && <JIcon name={iconName} color={iconColor} className={defaultItemStyles.icon} />}
      <div className={defaultItemStyles.wrap}>
        <span className={defaultItemStyles.title}>{title}</span>
        <span className={defaultItemStyles.description}>{description}</span>
      </div>
    </div>
  )
}

DefaultItem.defaultProps = {
  description: '',
  iconName: '',
  iconColor: 'blue',
}

export { DefaultItem }
