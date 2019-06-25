// @flow strict

import React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import buttonStyle from 'components/base/Button/button.m.scss'
import titleHeaderStyle from 'components/TitleHeader/titleHeader.m.scss'

import {
  WalletCard,
  TitleHeader,
} from 'components'

import {
  JIcon,
  JLink,
} from 'components/base'

import style from './wallets.m.scss'

export type Props = {|
  +items: Wallets,
  +activeWalletId: WalletId,
|}

export function WalletsView({
  items,
  activeWalletId,
}: Props) {
  return (
    <div className={style.core}>
      <TitleHeader title='My Wallets'>
        <JLink
          className={classNames(buttonStyle.additionalIcon, titleHeaderStyle.action)}
          href='/wallets/create'
        >
          <JIcon
            name='ic_add_24-use-fill'
            className={titleHeaderStyle.icon}
          />
          <span className={titleHeaderStyle.label}>
            {t`Create Wallet`}
          </span>
        </JLink>
        <JLink
          className={classNames(buttonStyle.additionalIcon, titleHeaderStyle.action)}
          href='/wallets/import'
        >
          <JIcon
            name='ic_import_wallet_24-use-fill'
            className={titleHeaderStyle.icon}
          />
          <span className={titleHeaderStyle.label}>
            {t`Import Wallet`}
          </span>
        </JLink>
      </TitleHeader>
      <div className={style.content}>
        <div className={style.wallets}>
          {items.map(({ id }: Wallet) => (
            <WalletCard
              id={id}
              key={id}
              activeWalletId={activeWalletId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
