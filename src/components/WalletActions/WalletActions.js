// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import { clipboard } from 'services'

import {
  JIcon,
  JLink,
} from 'components/base'

import walletActionsStyle from './walletActions.m.scss'

type RenameHandler = () => any

type Props = {|
  +onRename: ?RenameHandler,
  +id: WalletId,
  +type: WalletCustomType,
  +isSimplified: ?boolean,
  +isFromAddressManager: ?boolean,
|}

type StateProps = {|
  +isToggled: boolean,
|}

export class WalletActions extends PureComponent<Props, StateProps> {
  static defaultProps = {
    onRename: null,
    isFromAddressManager: false,
  }

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
    const { onRename }: Props = this.props

    if (!onRename) {
      return
    }

    this.setState({ isToggled: false })
    onRename()
    event.stopPropagation()
  }

  render() {
    const {
      id,
      type,
      onRename,
      isSimplified,
      isFromAddressManager,
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
          '__wallet-actions',
          walletActionsStyle.core,
          isToggled && walletActionsStyle.toggled,
        )}
      >
        <div
          onClick={this.handleToggle}
          className={walletActionsStyle.overlay}
        />
        <div
          onClick={this.handleToggle}
          className={walletActionsStyle.icon}
        >
          <JIcon
            color='white'
            name='kebab-menu-use-fill'
          />
        </div>
        <div className={classNames(
          walletActionsStyle.actions,
          !isToggled && walletActionsStyle['-hide'],
        )}
        >
          {hasSingleAddress && (
            <button
              type='button'
              onClick={this.handleCopyAddress}
              className={classNames(
                walletActionsStyle.action,
                walletActionsStyle['-button'],
              )}
            >
              {t`Copy Wallet Address`}
            </button>
          )}
          {onRename && (
            <button
              type='button'
              onClick={this.handleRename}
              className={classNames(
                walletActionsStyle.action,
                walletActionsStyle['-button'],
              )}
            >
              {t`Rename Wallet`}
            </button>
          )}
          {isReadOnly && (
            <JLink
              href={`/wallets/${id}/upgrade`}
              className={walletActionsStyle.action}
            >
              {t`Unlock Features`}
            </JLink>
          )}
          {isMultiAddressWallet && !isFromAddressManager && (
            <JLink
              href={`/wallets/${id}/addresses`}
              className={walletActionsStyle.action}
            >
              {t`Manage Addresses`}
            </JLink>
          )}
          {isMultiAddressWallet && (
            <JLink
              href={`/wallets/${id}/mode`}
              className={walletActionsStyle.action}
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
              className={walletActionsStyle.action}
            >
              {t`Backup Wallet`}
            </JLink>
          )}
          <JLink
            href={`/wallets/${id}/delete`}
            className={walletActionsStyle.action}
          >
            {t`Delete Wallet`}
          </JLink>
        </div>
      </div>
    )
  }
}
