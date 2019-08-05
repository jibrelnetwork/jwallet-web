// @flow strict

import React from 'react'
import { connect } from 'react-redux'
import { actions as routerActions } from 'redux-router5'
import { useI18n } from 'app/hooks'

import { TitleHeader } from 'components'
import { selectFavorite } from 'store/selectors/favorites'
import { PageNotFoundError } from 'errors'

import * as favorites from 'store/modules/favorites'

import {
  ContactEditForm,
  type FormValues,
} from './components/ContactEditForm/ContactEditForm'

import {
  checkContactExistsByName as checkContactExistsByNameFn,
} from '../ContactsItemAdd/ContactsItemAdd'

import style from './contactsItemEdit.m.scss'

type OwnProps = {|
  +contactId: OwnerAddress,
|}

type Props = {|
  ...OwnProps,
  +name: string,
  +description: string,
  +address: OwnerAddress,
  +onEditFinish: (contact: FormValues) => ?FormValues,
  +onDelete: (address: OwnerAddress) => any,
  +checkContactExistsByName: (name: string, address: OwnerAddress) => boolean,
  +goBack: () => any,
|}

function ContactsItemEditView({
  address,
  name,
  description,
  onEditFinish,
  checkContactExistsByName,
  onDelete,
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
        onEditFinish={onEditFinish}
        checkContactExistsByName={checkContactExistsByName}
        onDelete={onDelete}
        goBack={goBack}
      />
    </div>
  )
}

function mapStateToProps(
  state: AppState,
  { contactId }: OwnProps,
) {
  const favorite = selectFavorite(state, contactId)

  if (!favorite) {
    throw new PageNotFoundError()
  }

  const {
    address,
    name = '',
    description = '',
  } = favorite

  return {
    checkContactExistsByName: checkContactExistsByNameFn(state),
    address,
    name,
    description,
  }
}

const mapDispatchToProps = {
  onEditFinish: favorites.update,
  goBack: () => routerActions.navigateTo('Contacts'),
  onDelete: (address: OwnerAddress) =>
    routerActions.navigateTo('ContactsItemDelete', { contactId: address }),
}

export const ContactsItemEdit = connect<Props, OwnProps, _, _, _, _ >(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsItemEditView)
