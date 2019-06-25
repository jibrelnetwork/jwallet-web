// @flow strict

import React from 'react'
import { t } from 'ttag'
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
        {t`Send to Asset`}
      </JLink>
    </div>
  )
}
