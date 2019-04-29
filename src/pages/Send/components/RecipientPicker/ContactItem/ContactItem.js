// @flow strict

import * as React from 'react'

import itemStyles from './contactItem.m.scss'
import { ContactIcon } from '../ContactIcon/ContactIcon'

type Props = {
  +name: string,
  +description: string,
  +address: string,
}

export function ContactItem({
  name,
  description,
  address,
}: Props) {
  return (
    <div className={itemStyles.core}>
      <ContactIcon className={itemStyles.icon} name={name} />
      <div className={itemStyles.wrap}>
        <span className={itemStyles.title}>{name || address}</span>
        <span className={itemStyles.description}>{description}</span>
      </div>
    </div>
  )
}

ContactItem.defaultProps = {
  name: '',
  description: '',
}
