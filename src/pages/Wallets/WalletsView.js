// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { i18n } from 'i18n/lingui'

import buttonStyles from 'components/base/Button/button.m.scss'
import titleHeaderStyles from 'components/TitleHeader/titleHeader.m.scss'

import {
  WalletCard,
  TitleHeader,
} from 'components'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from './wallets.m.scss'

export type Props = {|
  +items: Wallets,
  +activeWalletId: WalletId,
|}

type StateProps = {|
  +activeAddressChooserId: ?WalletId,
|}

export class WalletsView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activeAddressChooserId: null,
    }
  }

  handleActiveAddressChooser = (walletId: ?WalletId) => {
    this.setState({
      activeAddressChooserId: walletId,
    })
  }

  render() {
    const {
      items,
      activeWalletId,
    }: Props = this.props

    const { activeAddressChooserId }: StateProps = this.state

    return (
      <div className={styles.core}>
        <TitleHeader title='My Wallets'>
          <JLink
            className={classNames(buttonStyles.additionalIcon, titleHeaderStyles.action)}
            href='/wallets/create'
          >
            <JIcon
              name='ic_add_24-use-fill'
              className={titleHeaderStyles.icon}
            />
            <span className={titleHeaderStyles.label}>
              {i18n._('Wallets.actions.create', null, { defaults: 'Create Wallet' })}
            </span>
          </JLink>
          <JLink
            className={classNames(buttonStyles.additionalIcon, titleHeaderStyles.action)}
            href='/wallets/import'
          >
            <JIcon
              name='ic_import_wallet_24-use-fill'
              className={titleHeaderStyles.icon}
            />
            <span className={titleHeaderStyles.label}>
              {i18n._('Wallets.actions.import', null, { defaults: 'Import Wallet' })}
            </span>
          </JLink>
        </TitleHeader>
        <div className={styles.content}>
          <div className={styles.wallets}>
            {items.map(({ id }: Wallet) => (
              <WalletCard
                onActiveAddressChooser={this.handleActiveAddressChooser}
                id={id}
                key={id}
                activeAddressChooserId={activeAddressChooserId}
                isActive={(id === activeWalletId)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
