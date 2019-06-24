// @flow strict

import React from 'react'
import { t } from 'ttag'
import { JLink } from 'components/base'

import offset from 'styles/offsets.m.scss'

import { ContactsItemDetails } from 'components/ContactsItemDetails/ContactsItemDetails'
import style from './contactsItem.m.scss'

export type Props = {|
  contactId: ContactId,
|}

export function ContactsItemView(props: Props) {
  return (
    <div className={style.core}>
      <ContactsItemDetails
        className={offset.mb32}
        contactId={props.contactId}
      />
      <JLink
        theme='button-general'
        href={`/send?to=${props.contactId}`}
      >
        {t`Send to Asset`}
      </JLink>
    </div>
  )
}
