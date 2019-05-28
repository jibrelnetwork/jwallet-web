// @flow strict

import React from 'react'

import itemStyles from './contactItem.m.scss'
import { ContactIcon } from '../ContactIcon/ContactIcon'
import { WalletBalance } from '../WalletBalance/WalletBalance'

type Props = {
  +name: string,
  +description: string,
  +address: string,
  +fiatBalance: string,
}

export function ContactItem({
  name,
  description,
  address,
  fiatBalance,
}: Props) {
  return (
    <div className={itemStyles.core}>
      <ContactIcon className={itemStyles.icon} name={name} />
      <div className={itemStyles.wrap}>
        <span className={itemStyles.title}>{name || address}</span>
        <span className={itemStyles.description}>{description}</span>
      </div>
      {fiatBalance && <WalletBalance fiatBalance={fiatBalance} />}
    </div>
  )
}

ContactItem.defaultProps = {
  name: '',
  description: '',
  fiatBalance: '',
}
