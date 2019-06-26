// @flow

import React from 'react'
import { noop } from 'lodash-es'
import { t } from 'ttag'
import {
  Button,
  Header,
  JIcon,
  JLink,
  SearchInput,
} from 'components/base'
import { ContactItem } from 'components'

import offset from 'styles/offsets.m.scss'

import style from './contacts.m.scss'

export type Props = {|
  list: Contact[],
|}

export function ContactsView(props: Props) {
  return (
    <div className={style.core}>
      <Header
        className={style.actions}
        title={t`Contacts`}
      >
        <div className={`${style.search} ${offset.mr24}`}>
          <SearchInput
            onChange={noop}
          />
        </div>
        <JLink href='/contacts/add' theme='button-additional-icon' className={style.addContact}>
          <JIcon name='add-contact-use-fill' className={Button.iconClassName} />
          {t`Add Contact`}
        </JLink>
      </Header>
      <ul>
        {props.list.map(item => (
          <li key={item.id}>
            <ContactItem contactId={item.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}
