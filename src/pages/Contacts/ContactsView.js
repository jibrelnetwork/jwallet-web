// @flow strict

import React from 'react'
import classNames from 'classnames'
import { useI18n } from 'app/hooks'

import { SearchInput } from 'components'
import { searchContacts } from 'utils/search'
import { splitContactName } from 'utils/formatters'
import { useInputValue } from 'utils/hooks/useInputValue'

import noContactsImg from 'public/assets/pic_contacts_112.svg'
import noResultImg from 'public/assets/pic_assets_112.svg'

import offset from 'styles/offsets.m.scss'
import buttonStyles from 'components/base/Button/button.m.scss'
import {
  JIcon,
  JLink,
  Header,
} from 'components/base'

import style from './contacts.m.scss'

import { ContactItem } from './components/ContactItem/ContactItem'

export type Props = {|
  list: Favorite[],
|}

const NAMELESS_SYMBOL = '#'

function extractAlphabet(list: Favorite[]): { [string]: Favorite[] } {
  const resultList = {}

  list.forEach((item) => {
    const { firstChar } = splitContactName(item.name || '')[0] || {}
    const char = firstChar || NAMELESS_SYMBOL

    if (resultList[char]) {
      // eslint-disable-next-line fp/no-mutating-methods
      resultList[char].push(item)
    } else {
      // eslint-disable-next-line fp/no-mutation
      resultList[char] = [item]
    }
  })

  // resultList.sort((a, b) => (a > b) ? -1 : 1)

  return resultList
}

function EmptyContacts() {
  const i18n = useI18n()

  return (
    <div className={style.center}>
      <figure className={style.emptyContacts}>
        <img
          src={noContactsImg}
          className={offset.mb24}
          alt=''
          aria-disabled
        />
        <figcaption>
          {i18n._(
            'Contacts.empty',
            null,
            { defaults: 'Your contacts will be displayed here. You can add a first one now!' },
          )}
        </figcaption>
      </figure>
    </div>
  )
}

function NotFoundContacts() {
  const i18n = useI18n()

  return (
    <div className={style.center}>
      <figure className={style.emptyContacts}>
        <img
          src={noResultImg}
          className={offset.mb24}
          alt={i18n._(
            'Contacts.noSearchResults.alt',
            null,
            { defaults: 'No search results in assets list' },
          )}
          aria-disabled
        />
        <figcaption>
          {i18n._(
            'Contacts.noSearchResults.description',
            null,
            { defaults: 'No Search Results' },
          )}
        </figcaption>
      </figure>
    </div>
  )
}

type ContactListProps = {
  alphabetList: {
    [string]: Favorite[],
  },
}

function ContactList({ alphabetList }: ContactListProps) {
  // eslint-disable-next-line fp/no-mutating-methods
  const letters = Object.keys(alphabetList).sort()

  return (
    <ul className='__contacts-list'>
      {letters.map(k => (
        <li key={k}>
          <div className={style.contactGroupTitle}>{k}</div>
          <ul>
            {alphabetList[k].map(item => (
              <li key={item.address}>
                <ContactItem address={item.address} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export function ContactsView({
  list,
}: Props) {
  const i18n = useI18n()
  const [searchQuery, { onChange: handleSearchChange }] = useInputValue()

  const contacts: Favorite[] = searchContacts(
    list,
    searchQuery,
  )

  const alphabetList = extractAlphabet(contacts)

  const isEmpty = list.length === 0
  const notFound = contacts.length === 0

  const Component = isEmpty
    ? <EmptyContacts />
    : notFound
      ? <NotFoundContacts />
      : <ContactList alphabetList={alphabetList} />

  return (
    <div className={classNames(style.core, (isEmpty || notFound) && style.empty)}>
      <Header title={i18n._('Contacts.title', null, { defaults: 'Contacts' })}>
        <div className={`${style.search} ${offset.mr24}`}>
          {!isEmpty &&
            <SearchInput
              onChange={handleSearchChange}
              value={searchQuery}
            />
          }
        </div>
        <JLink
          href='/contacts/add'
          theme='button-additional-icon'
          className={style.addContact}
        >
          <JIcon
            name='add-contact-use-fill'
            className={buttonStyles.icon}
          />
          <span className={buttonStyles.label}>
            {i18n._('Contacts.actions.add', null, { defaults: 'Add Contact' })}
          </span>
        </JLink>
      </Header>
      {Component}
    </div>
  )
}
