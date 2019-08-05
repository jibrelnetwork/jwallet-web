// @flow strict

import React from 'react'
import classNames from 'classnames'
import { useI18n } from 'app/hooks'

import offset from 'styles/offsets.m.scss'
import noContactsImg from 'public/assets/pic_contacts_112.svg'
import buttonStyles from 'components/base/Button/button.m.scss'
import { SearchInput } from 'components'
import { splitContactName } from 'utils/formatters'
import { useInputValue } from 'utils/hooks/useInputValue'
import { filterContacts } from 'utils/search/filterContacts'

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

  return resultList
}

export function ContactsView({
  list,
}: Props) {
  const i18n = useI18n()
  const [searchQuery, { onChange: handleSearchChange }] = useInputValue()
  const contacts = filterContacts(list, searchQuery)
  const alphabetList = extractAlphabet(contacts)

  const isEmpty = list.length === 0

  return (
    <div className={classNames(style.core, isEmpty && style.empty)}>
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
      {isEmpty ? (
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
      ) : (
        <ul className='__contacts-list'>
          {Object.keys(alphabetList).map(k => (
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
      )}
    </div>
  )
}
