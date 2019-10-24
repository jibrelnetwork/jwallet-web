// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import offset from 'styles/offsets.m.scss'
import { ConfirmationBody } from 'components'
import { gaSendEvent } from 'utils/analytics'

import {
  Button,
  JLink,
} from 'components/base'

import styles from './contactsItemDelete.m.scss'

export type Props = {|
  goBack: () => any,
  onDeleteContact: (address: OwnerAddress) => any,
  i18n: I18n,
  name: string,
  address: OwnerAddress,
  /* :: +contactId: OwnerAddress, */
|}

class ContactsItemDeleteViewComponent extends PureComponent<Props> {
  handleDeleteContactClick = () => {
    const {
      address,
      goBack,
      onDeleteContact,
    }: Props = this.props

    onDeleteContact(address)

    gaSendEvent(
      'ContactManager',
      'ContactDeleted',
    )

    goBack()
  }

  render() {
    const {
      i18n,
      name,
      address,
    }: Props = this.props

    return (
      <div className={styles.core}>
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
        <div className={styles.actions}>
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
