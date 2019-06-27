// @flow

import React from 'react'
import { connect } from 'react-redux'
import { keyBy } from 'lodash-es'

import { ItemCard } from 'components/base'

import offset from 'styles/offsets.m.scss'

import CONTACT_LIST from 'pages/Contacts/CONTACT_LIST'

import style from './contactItem.m.scss'

type OwnProps = {|
  +contactId: ContactId,
|}

type Props = {|
  +onClick: Function,
  +id: ContactId,
  +name: string,
  +note: string,
  +isActive?: boolean,
  ...OwnProps,
|}

function getName(dividedName: string[]) {
  switch (dividedName.length) {
    case 0:
      return null
    case 1:
      return dividedName[0][0]
    default:
      return `${dividedName[0][0]}${dividedName[1][0]}`
  }
}

function Component(props: Props) {
  return (
    <ItemCard
      href={`/contacts/${props.id}`}
      onClick={props.onClick}
      isActive={props.isActive}
      className={`__contact-item ${offset.mb16}`}
    >
      <div className={`${style.item} ${style.avatar}`}>
        <div className={style.placeholder}>
          {getName(props.name.split(' '))}
        </div>
      </div>
      <div className={`${style.item} ${style.mainBlock}`}>
        <div className={style.text}>{props.name || props.id}</div>
        <div className={style.subtext}>{props.note}</div>
      </div>
    </ItemCard>
  )
}

Component.defaultProps = {
  isActive: false,
}

export const ContactItem =
  connect< Props, OwnProps, _, _, _, _ >((state: AppState, { contactId }: OwnProps) => {
    const contact = keyBy(CONTACT_LIST, 'id')[contactId]

    return contact
  })(React.memo<Props>(Component))
