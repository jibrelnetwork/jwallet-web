// @flow strict

import React from 'react'
import { connect } from 'react-redux'
import { actions as routerActions } from 'redux-router5'
import { useI18n } from 'app/hooks'

import { TitleHeader } from 'components'
import {
  selectFavorite,
  selectFavoritesItems,
} from 'store/selectors/favorites'

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
  +checkContactExistsByAddress: (address: OwnerAddress) => boolean,
  +checkContactExistsByName: (name: string, contactId: string) => boolean,
  +addContact: (contact: FormValues) => ?FormValues,
  +goBack: () => any,
|}

function ContactsItemAddView({
  address,
  name,
  goBack,
  addContact,
  checkContactExistsByAddress,
  checkContactExistsByName,
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
        checkContactExistsByAddress={checkContactExistsByAddress}
        checkContactExistsByName={checkContactExistsByName}
        addContact={addContact}
        goBack={goBack}
      />
    </div>
  )
}

const checkContactExistsByAddress = (state: AppState) => (address: OwnerAddress) =>
  !!selectFavorite(state, address)

export const checkContactExistsByName = (state: AppState) =>
  (name: string, contactId: string = '') => {
    if (!name || !name.trim()) {
      return false
    }

    const contacts = selectFavoritesItems(state)

    return Object.keys(contacts).reduce((res, id: $Keys<typeof contacts>) =>
      res || (id !== contactId && contacts[id] && contacts[id].name === name), false) || false
  }

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
    checkContactExistsByAddress: checkContactExistsByAddress(state),
    checkContactExistsByName: checkContactExistsByName(state),
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
