// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  Button,
  JLink,
} from 'components/base'
import { ConfirmationBody } from 'components'

import offset from 'styles/offsets.m.scss'
import style from './contactsItemDelete.m.scss'

export type Props = {|
  name: string,
  address: OwnerAddress,
  i18n: I18nType,
  onDeleteContact: (address: OwnerAddress) => any,
  goBack: () => any,
  /* :: +contactId: OwnerAddress, */
|}

class ContactsItemDeleteViewComponent extends PureComponent<Props> {
  handleDeleteContactClick = () => {
    const {
      address,
      onDeleteContact,
      goBack,
    } = this.props

    onDeleteContact(address)
    goBack()
  }

  render() {
    const {
      i18n,
      name,
      address,

    } = this.props

    return (
      <div className={style.core}>
        <ConfirmationBody
          iconName='ic_delete_48-use-fill'
          iconColor='gray'
          title={i18n._(
            'ContactsItemDelete.title',
            null,
            { defaults: 'Delete Contact?' },
          )}
        >
          <span>{name}</span><br />
          <span>{address}</span>
        </ConfirmationBody>
        <div className={style.actions}>
          <Button
            className={offset.mr32}
            theme='secondary-confirm'
            onClick={this.handleDeleteContactClick}
          >
            {i18n._(
              'ContactsItemDelete.actions.confirm',
              null,
              { defaults: 'Delete' },
            )}
          </Button>
          <JLink
            theme='button-general-confirm'
            href={`/contacts/${address}`}
          >
            {i18n._(
              'ContactsItemDelete.actions.cancel',
              null,
              { defaults: 'Keep Contact' },
            )}
          </JLink>
        </div>
      </div>
    )
  }
}

export const ContactsItemDeleteView = withI18n()(ContactsItemDeleteViewComponent)
