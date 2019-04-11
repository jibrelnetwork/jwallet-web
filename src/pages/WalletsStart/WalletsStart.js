// @flow strict

import React from 'react'
import { t } from 'ttag'

import {
  LogoHeader,
  NewWalletButtons,
} from 'components'

import walletsStartStyle from './walletsStart.m.scss'

export function WalletsStart() {
  return (
    <div className={`__wallets-start ${walletsStartStyle.core}`}>
      <LogoHeader />
      <div className={walletsStartStyle.content}>
        <h1 className={walletsStartStyle.title}>
          <span>{t`Create a new wallet or import an existing`}</span>
          <span>{t`to get started`}</span>
        </h1>
        <NewWalletButtons />
      </div>
    </div>
  )
}
