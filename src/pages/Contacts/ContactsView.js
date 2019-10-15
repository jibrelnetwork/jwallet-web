// @flow strict

import React from 'react'
import classNames from 'classnames'
import { useI18n } from 'app/hooks'
import { type I18n } from '@lingui/core'

import { searchContacts } from 'utils/search'
import { splitContactName } from 'utils/formatters'
import { useInputValue } from 'utils/hooks/useInputValue'

import noContactsImg from 'public/assets/pic_contacts_112.svg'
import noResultImg from 'public/assets/pic_assets_112.svg'

import offset from 'styles/offsets.m.scss'
import buttonStyles from 'components/base/Button/button.m.scss'
import titleHeaderStyles from 'components/TitleHeader/titleHeader.m.scss'

import {
  SearchInput,
  TitleHeader,
} from 'components'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from './contacts.m.scss'
import { ContactItem } from './components/ContactItem/ContactItem'

export type Props = {|
  list: Favorite[],
|}

type AlphabetList = { [string]: Favorite[] }

const NAMELESS_SYMBOL = '#'

function extractAlphabet(list: Favorite[]): AlphabetList {
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

  return resultList
}

function compareAlphabet(
  a: string,
  b: string,
): -1 | 0 | 1 {
  if (a === NAMELESS_SYMBOL) {
    return 1
  } else if (b === NAMELESS_SYMBOL) {
    return -1
  } else if (a > b) {
    return 1
  } else if (a < b) {
    return -1
  }

  return 0
}

function EmptyContacts() {
  const i18n: I18n = useI18n()

  return (
    <div className={styles.center}>
      <figure className={styles.emptyContacts}>
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
  const i18n: I18n = useI18n()

  return (
    <div className={styles.center}>
      <figure className={styles.emptyContacts}>
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

function ContactList({ alphabetList }: {|
  +alphabetList: AlphabetList,
|}) {
  // eslint-disable-next-line fp/no-mutating-methods
  const letters: string[] = Object.keys(alphabetList).sort((
    a: string,
    b: string,
  ) => compareAlphabet(
    a,
    b,
  ))

  return (
    <ul className='__contacts-list'>
      {letters.map((k: string) => (
        <li key={k}>
          <div className={styles.contactGroupTitle}>{k}</div>
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

export function ContactsView({ list }: Props) {
  const i18n: I18n = useI18n()
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
    <div className={classNames(styles.core, (isEmpty || notFound) && styles.empty)}>
      <TitleHeader
        title={i18n._('Contacts.title', null, { defaults: 'Contacts' })}
        withMenu
      >
        <div className={`${styles.search} ${offset.mr24}`}>
          {!isEmpty &&
            <SearchInput
              onChange={handleSearchChange}
              value={searchQuery}
            />
          }
        </div>
        <JLink
          className={classNames(buttonStyles.additionalIcon, titleHeaderStyles.action)}
          href='/contacts/add'
        >
          <JIcon
            name='add-contact-use-fill'
            className={titleHeaderStyles.icon}
          />
          <span className={titleHeaderStyles.label}>
            {i18n._('Contacts.actions.add', null, { defaults: 'Add Contact' })}
          </span>
        </JLink>
      </TitleHeader>
      {Component}
    </div>
  )
}
