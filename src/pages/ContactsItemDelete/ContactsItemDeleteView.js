// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'
import {
  Button,
  JLink,
} from 'components/base'
import {
  ConfirmationBody,
} from 'components'

import offset from 'styles/offsets.m.scss'

import style from './contactsItemDelete.m.scss'

export type Props = {|
  contactId: ContactId,
  name: string,
|}

export function ContactsItemDeleteView(props: Props) {
  const i18n = useI18n()

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
        <span>{props.name}</span><br />
        <span>{props.contactId}</span>
      </ConfirmationBody>
      <div className={style.actions}>
        <Button
          className={offset.mr32}
          theme='secondary-confirm'
          onClick={() => { alert(`${props.name} with address ${props.contactId} was deleted.`) }}
        >
          {i18n._(
            'ContactsItemDelete.actions.confirm',
            null,
            { defaults: 'Delete' },
          )}
        </Button>
        <JLink
          theme='button-general-confirm'
          href={`/contacts/${props.contactId}`}
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
