// @flow strict

import React from 'react'
import { i18n } from 'i18n/lingui'
import { JLink } from 'components/base'
import { TitleHeader } from 'components'

import offset from 'styles/offsets.m.scss'

import { ContactsItemDetails } from 'components/ContactsItemDetails/ContactsItemDetails'
import style from './contactsItem.m.scss'

export type Props = {|
  contactId: ContactId,
|}

export function ContactsItemView(props: Props) {
  return (
    <div className={style.core}>
      <TitleHeader
        title='Contact'
        onBack={null}
      />
      <ContactsItemDetails
        className={offset.mb32}
        contactId={props.contactId}
      />
      <JLink
        theme='button-general'
        href={`/send?to=${props.contactId}`}
      >
        {i18n._('ContactsItem.actions.send', null, { defaults: 'Send to Address' })}
      </JLink>
    </div>
  )
}
