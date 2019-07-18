// @flow strict

import React from 'react'
import { connect } from 'react-redux'
import { actions as routerActions } from 'redux-router5'
import { useI18n } from 'app/hooks'

import { TitleHeader } from 'components'
import { selectFavorite } from 'store/selectors/favorites'

import * as favorites from 'store/modules/favorites'

import {
  ContactEditForm,
  type FormValues,
} from './components/ContactEditForm/ContactEditForm'

import style from './contactsItemEdit.m.scss'

type OwnProps = {|
  +contactId?: OwnerAddress,
|}

type Props = {|
  ...OwnProps,
  +name: string,
  +description: string,
  +address: OwnerAddress,
  +checkContactExists: (address: OwnerAddress) => boolean,
  +editContact: (contact: FormValues) => ?FormValues,
  +onDeleteClick: (address: OwnerAddress) => any,
  +goBack: () => any,
|}

function ContactsItemEditView({
  address,
  name,
  description,
  checkContactExists,
  editContact,
  onDeleteClick,
  goBack,
}: Props) {
  const i18n = useI18n()

  const initialValues = {
    name,
    address,
    description,
  }

  return (
    <div className={style.core}>
      <TitleHeader
        title={i18n._(
          'ContactsItemEdit.title',
          null,
          { defaults: 'Edit contact' },
        )}
      />
      <ContactEditForm
        initialValues={initialValues}
        checkContactExists={checkContactExists}
        editContact={editContact}
        onDeleteClick={onDeleteClick}
        goBack={goBack}
      />
    </div>
  )
}

const checkContactExists = (state: AppState) => (address: OwnerAddress) =>
  !!selectFavorite(state, address)

function mapStateToProps(
  state: AppState,
  { contactId }: OwnProps,
) {
  const {
    address,
    name = '',
    description = '',
  } = selectFavorite(state, contactId || '') || {}

  return {
    address,
    name,
    description,
    checkContactExists: checkContactExists(state),
  }
}

const mapDispatchToProps = {
  editContact: favorites.update,
  goBack: () => routerActions.navigateTo('Contacts'),
  onDeleteClick: (address: OwnerAddress) =>
    routerActions.navigateTo('ContactsItemDelete', { contactId: address }),
}

export const ContactsItemEdit = connect<Props, OwnProps, _, _, _, _ >(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsItemEditView)
