// @flow strict

import React, { Fragment } from 'react'
import { t } from 'ttag'

import emptyContacts from 'public/assets/thumbnail/empty-contacts.svg'
import emptyWallets from 'public/assets/thumbnail/empty-wallets.svg'

import emptyStyles from './empty.m.scss'

import { type Tab } from './Tabs'

type Props = {|
  tab: Tab,
|}

const emptyContactsTab = () => (
  <Fragment>
    <img
      src={emptyContacts}
      className={emptyStyles.img}
      alt={t`Empty contacts`}
    />
    <div className={emptyStyles.text}>{t`Your contacts will be displayed here.`}</div>
  </Fragment>
)

const emptyWalletsTab = () => (
  <Fragment>
    <img
      src={emptyWallets}
      className={emptyStyles.img}
      alt={t`Empty wallets`}
    />
    <div className={emptyStyles.text}>{t`Your wallets will be displayed here.`}</div>
  </Fragment>
)

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
