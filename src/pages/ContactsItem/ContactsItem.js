// @flow strict

import React from 'react'
import { type I18n } from '@lingui/core'

import offset from 'styles/offsets.m.scss'
import { useI18n } from 'app/hooks'
import { JLink } from 'components/base'

import {
  TitleHeader,
  ContactsItemDetails,
} from 'components'

import styles from './contactsItem.m.scss'

type Props = {|
  +contactId: Address,
|}

export function ContactsItem({ contactId }: Props) {
  const i18n: I18n = useI18n()

  return (
    <div className={styles.core}>
      <TitleHeader title='Contact' />
      <ContactsItemDetails
        contactId={contactId}
        className={offset.mb16}
      />
      <JLink
        href={`/send?to=${contactId}`}
        theme='button-general'
      >
        {i18n._('ContactsItem.actions.send', null, { defaults: 'Send to Address' })}
      </JLink>
    </div>
  )
}
