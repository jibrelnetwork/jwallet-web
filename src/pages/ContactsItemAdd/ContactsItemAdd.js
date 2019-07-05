// @flow strict

import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'
import { actions as routerActions } from 'redux-router5'

import {
  TitleHeader,
  ContactsEditForm,
} from 'components'
import * as contacts from 'store/modules/contacts'

import style from './contactsItemAdd.m.scss'

type OwnProps = {|
  +address?: ContactId,
  +name?: string,
  +note?: string,
|}

type Props = {|
  ...OwnProps,
  saveContact: (contact: Contact) => Promise<*>,
|}

function ContactsItemAddView(props: Props) {
  return (
    <div className={style.core}>
      <TitleHeader
        title={t`Add Contact`}
      />
      <ContactsEditForm {...props} />
    </div>
  )
}

function mapStateToProps(
  state: AppState,
  {
    address,
    name,
    note,
  }: OwnProps,
) {
  const handledAddress = address || ''
  const handledNote = note || ''
  const handledName = name || ''

  return {
    address: handledAddress,
    note: handledNote,
    name: handledName,
  }
}

const mapDispatchToProps = {
  saveContact: contacts.update,
  goBack: () => routerActions.navigateTo('Contacts'),
}

export const ContactsItemAdd = connect< Props, OwnProps, _, _, _, _ >(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsItemAddView)
