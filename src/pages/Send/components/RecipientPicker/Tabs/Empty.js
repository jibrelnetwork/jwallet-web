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

export function Empty({
  tab,
}: Props) {
  return (
    <div className={emptyStyles.core}>
      {tab === 'contacts' ? (
        <Fragment>
          <img
            src={emptyContacts}
            className={emptyStyles.img}
            alt={t`Empty contacts`}
          />
          <div className={emptyStyles.text}>{t`Your contacts will be displayed here.`}</div>
        </Fragment>
      ) : (
        <Fragment>
          <img
            src={emptyWallets}
            className={emptyStyles.img}
            alt={t`Empty wallets`}
          />
          <div className={emptyStyles.text}>{t`Your wallets will be displayed here.`}</div>
        </Fragment>
      )}
    </div>
  )
}
