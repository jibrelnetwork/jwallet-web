// @flow

import React from 'react'
import { connect } from 'react-redux'

import {
  ItemCard,
  JIcon,
} from 'components/base'
import { formatInitials } from 'utils/formatters'
import { selectFavorite } from 'store/selectors/favorites'

import offset from 'styles/offsets.m.scss'
import style from './contactItem.m.scss'

type OwnProps = {|
  +address: OwnerAddress,
|}

type Props = {|
  +onClick: Function,
  +address: OwnerAddress,
  +name: string,
  +description: string,
  +isActive?: boolean,
|}

function ContactItemComponent(props: Props) {
  const nameInitials = formatInitials(props.name)

  return (
    <ItemCard
      href={`/contacts/${props.address}`}
      onClick={props.onClick}
      isActive={props.isActive}
      className={`__contact-item ${offset.mb16}`}
    >
      <div className={`${style.item} ${style.avatar}`}>
        <div className={style.back}>
          {nameInitials
            ? <div className={style.placeholder}>{nameInitials}</div>
            : <JIcon name='ic_account_24-use-fill' />
          }
        </div>
      </div>
      <div className={`${style.item} ${style.mainBlock}`}>
        <div className={style.text}>{props.name || props.address}</div>
        <div className={style.subtext}>{props.description}</div>
      </div>
    </ItemCard>
  )
}

ContactItemComponent.defaultProps = {
  isActive: false,
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const { address } = ownProps

  const contact = selectFavorite(state, address)

  return {
    ...contact,
  }
}

export const ContactItem = connect< Props, OwnProps, _, _, _, _ >(
  mapStateToProps,
)(ContactItemComponent)
