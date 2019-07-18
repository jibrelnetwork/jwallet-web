// @flow strict

import React from 'react'
import { connect } from 'react-redux'
import { actions as routerActions } from 'redux-router5'
import { useI18n } from 'app/hooks'

import { TitleHeader } from 'components'
import { selectFavorite } from 'store/selectors/favorites'

import * as favorites from 'store/modules/favorites'

import {
  ContactAddForm,
  type FormValues,
} from './components/ContactAddForm/ContactAddForm'

import style from './contactsItemAdd.m.scss'

type OwnProps = {|
  +address?: OwnerAddress,
  +name?: string,
|}

type Props = {|
  ...OwnProps,
  +checkContactExists: (address: OwnerAddress) => boolean,
  +addContact: (contact: FormValues) => ?FormValues,
  +goBack: () => any,
|}

function ContactsItemAddView({
  address,
  name,
  checkContactExists,
  addContact,
  goBack,
}: Props) {
  const i18n = useI18n()

  const initialValues = {
    name,
    address,
  }

  return (
    <div className={style.core}>
      <TitleHeader
        title={i18n._(
          'ContactsItemAdd.title',
          null,
          { defaults: 'Add contact' },
        )}
      />
      <ContactAddForm
        initialValues={initialValues}
        checkContactExists={checkContactExists}
        addContact={addContact}
        goBack={goBack}
      />
    </div>
  )
}

const checkContactExists = (state: AppState) => (address: OwnerAddress) =>
  !!selectFavorite(state, address)

function mapStateToProps(
  state: AppState,
  {
    address,
    name,
  }: OwnProps,
) {
  return {
    address: address || '',
    name: name || '',
    checkContactExists: checkContactExists(state),
  }
}

const mapDispatchToProps = {
  addContact: favorites.add,
  goBack: () => routerActions.navigateTo('Contacts'),
}

export const ContactsItemAdd = connect<Props, OwnProps, _, _, _, _ >(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsItemAddView)
