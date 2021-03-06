// @flow strict

import React, { Fragment } from 'react'
import { useI18n } from 'app/hooks'

import emptyContacts from 'public/assets/thumbnail/empty-contacts.svg'
import emptyWallets from 'public/assets/thumbnail/empty-wallets.svg'

import emptyStyles from './empty.m.scss'

import { type Tab } from './Tabs'

type Props = {|
  tab: Tab,
|}

const emptyContactsTab = () => {
  const i18n = useI18n()

  return (
    <Fragment>
      <img
        src={emptyContacts}
        className={emptyStyles.img}
        alt={i18n._(
          'Send.RecipientPicker.contactsEmpty.alt',
          null,
          { defaults: 'Empty contacts' },
        )}
      />
      <div className={emptyStyles.text}>
        {i18n._(
          'Send.RecipientPicker.contactsEmpty.description',
          null,
          { defaults: 'Your contacts will be displayed here.' },
        )}
      </div>
    </Fragment>
  )
}

const emptyWalletsTab = () => {
  const i18n = useI18n()

  return (
    <Fragment>
      <img
        src={emptyWallets}
        className={emptyStyles.img}
        alt={i18n._(
          'Send.RecipientPicker.walletsEmpty.alt',
          null,
          { defaults: 'Empty wallets' },
        )}
      />
      <div className={emptyStyles.text}>
        {i18n._(
          'Send.RecipientPicker.walletsEmpty.description',
          null,
          { defaults: 'Your wallets will be displayed here.' },
        )}
      </div>
    </Fragment>
  )
}

export function Empty({
  tab,
}: Props) {
  return (
    <div className={emptyStyles.core}>
      {tab === 'contacts'
        ? emptyContactsTab()
        : emptyWalletsTab()
      }
    </div>
  )
}
