// @flow

import React from 'react'
import classNames from 'classnames'
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

import noContactsImg from 'public/assets/pic_contacts_112.svg'
import offset from 'styles/offsets.m.scss'

import style from './contacts.m.scss'

export type Props = {|
  list: Contact[],
|}

export function ContactsEmptyView(props: Props) {
  const isEmpty = props.list.length <= 0

  return (
    <div className={classNames(style.core, isEmpty && style.empty)}>
      <Header title={t`Contacts`} className={style.header}>
        {!isEmpty && (
          <div className={`${style.search} ${offset.mr24}`}>
            <SearchInput
              onChange={noop}
            />
          </div>
        )}
        <JLink
          href='/contacts/add'
          theme='button-additional-icon'
          className={style.addContact}
        >
          <JIcon name='add-contact-use-fill' className={Button.iconClassName} />
          {t`Add Contact`}
        </JLink>
      </Header>
      <ul className={`__contacts-list ${style.list}`}>
        <figure className={style.emptyFigure}>
          <img
            src={noContactsImg}
            alt=''
            aria-disabled
          />
          <figcaption>
            {t`Your contacts will be displayed here. You can add a first one now!.`}
          </figcaption>
        </figure>
      </ul>
    </div>
  )
}
