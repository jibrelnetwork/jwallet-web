// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import { clipboard } from 'services'

import {
  JIcon,
  JLink,
} from 'components/base'

import walletCardActionsStyles from './walletCardActions.m.scss'

type Props = {|
  +onRename: () => void,
  +id: WalletId,
  +type: WalletCustomType,
  +isSimplified: ?boolean,
|}

type StateProps = {|
  isToggled: boolean,
|}

export class WalletCardActions extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isToggled: false,
    }
  }

  handleToggle = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault()
    this.setState({ isToggled: !this.state.isToggled })
    event.stopPropagation()
  }

  handleCopyAddress = (event: SyntheticEvent<HTMLSpanElement>) => {
    this.setState({ isToggled: false })
    clipboard.copyText('TEST ADDRESS')
    event.stopPropagation()
  }

  handleRename = (event: SyntheticEvent<HTMLSpanElement>) => {
    this.setState({ isToggled: false })
    this.props.onRename()
    event.stopPropagation()
  }

  render() {
    const {
      id,
      type,
      isSimplified,
    }: Props = this.props

    const { isToggled }: StateProps = this.state
    const isXPUBType: boolean = (type === 'xpub')
    const isPKType: boolean = (type === 'privateKey')
    const isAddressType: boolean = (type === 'address')
    const isReadOnly: boolean = (isAddressType || isXPUBType)
    const isAddressOrPKType: boolean = (isAddressType || isPKType)
    const hasSingleAddress: boolean = (isSimplified || isAddressOrPKType)
    const isMultiAddressWallet: boolean = !isAddressOrPKType

    return (
      <div
        className={classNames(
          walletCardActionsStyles.core,
          isToggled && walletCardActionsStyles.toggled,
          '__wallet-card-actions',
        )}
      >
        <div
          onClick={this.handleToggle}
          className={walletCardActionsStyles.overlay}
        />
        <div
          onClick={this.handleToggle}
          className={walletCardActionsStyles.icon}
        >
          <JIcon
            color='white'
            name='kebab-menu-use-fill'
          />
        </div>
        <div className={classNames(
          walletCardActionsStyles.actions,
          !isToggled && walletCardActionsStyles['-hide'],
        )}
        >
          {hasSingleAddress && (
            <button
              type='button'
              onClick={this.handleCopyAddress}
              className={classNames(
                walletCardActionsStyles.action,
                walletCardActionsStyles['-button'],
              )}
            >
              {t`Copy Wallet Address`}
            </button>
          )}
          <button
            type='button'
            onClick={this.handleRename}
            className={classNames(
              walletCardActionsStyles.action,
              walletCardActionsStyles['-button'],
            )}
          >
            {t`Rename Wallet`}
          </button>
          <JLink
            href={`/wallets/${id}/upgrade`}
            className={walletCardActionsStyles.action}
          >
            {t`Unlock Features`}
          </JLink>
          <JLink
            href={`/wallets/${id}/addresses`}
            className={walletCardActionsStyles.action}
          >
            {t`Manage Addresses`}
          </JLink>
          {isMultiAddressWallet && (
            <JLink
              href={`/wallets/${id}/mode`}
              className={walletCardActionsStyles.action}
            >
              {isSimplified
                ? t`Enable Multi-Address Mode`
                : t`Disable Multi-Address Mode`
              }
            </JLink>
          )}
          {!isReadOnly && (
            <JLink
              href={`/wallets/${id}/backup`}
              className={walletCardActionsStyles.action}
            >
              {t`Backup Wallet`}
            </JLink>
          )}
          <JLink
            href={`/wallets/${id}/delete`}
            className={walletCardActionsStyles.action}
          >
            {t`Delete Wallet`}
          </JLink>
        </div>
      </div>
    )
  }
}
