// @flow strict

import React from 'react'
import { t } from 'ttag'
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
  return (
    <div className={style.core}>
      <ConfirmationBody
        iconName='ic_delete_48-use-fill'
        iconColor='gray'
        title={t`Delete Contact?`}
      >
        <span>{props.name}</span><br />
        <span>{props.contactId}</span>
      </ConfirmationBody>
      <div className={style.actions}>
        <Button
          className={offset.mr32}
          theme='secondary'
          onClick={() => { alert(`${props.name} with address ${props.contactId} was deleted.`) }}
        >
          {t`Delete`}
        </Button>
        <JLink
          theme='button-general'
          href={`/contacts/${props.contactId}`}
        >
          {t`Keep Contact`}
        </JLink>
      </div>
    </div>
  )
}
