// @flow

import React from 'react'
import {
  noop,
} from 'lodash-es'
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

const NAMELESS_SYMBOL = ''

function extractAlphabet(list: Contact[]): { [string]: Contact[] } {
  const resultList = {}

  list.forEach((item) => {
    const char = item.name[0] || NAMELESS_SYMBOL

    if (resultList[char]) {
      // eslint-disable-next-line fp/no-mutating-methods
      resultList[char].push(item)
    } else {
      // eslint-disable-next-line fp/no-mutation
      resultList[char] = [item]
    }
  })

  return resultList
}

export function ContactsView(props: Props) {
  const alphabetList = extractAlphabet(props.list)

  return (
    <div className={style.core}>
      <div className={style.headerWrapper}>
        <Header
          className={style.actions}
          title={t`Contacts`}
        >
          <div className={`${style.search} ${offset.mr24}`}>
            <SearchInput
              onChange={noop}
            />
          </div>
          <JLink
            href='/contacts/add'
            theme='button-additional-icon'
            className={style.addContact}
          >
            <JIcon name='add-contact-use-fill' className={Button.iconClassName} />
            {t`Add Contact`}
          </JLink>
        </Header>
      </div>
      <ul className='__contacts-list'>
        {Object.keys(alphabetList).map(k => (
          <li key={k}>
            <div className={style.contactGroupTitle}>{k}</div>
            <ul>
              {alphabetList[k].map(item => (
                <li key={item.id}>
                  <ContactItem contactId={item.id} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
