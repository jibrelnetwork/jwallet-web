// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { clipboard } from 'services'

import {
  toastsPlugin,
  walletsPlugin,
} from 'store/plugins'

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
  +i18n: I18nType,
|}

type StateProps = {|
  +isToggled: boolean,
|}

class WalletActionsComponent extends PureComponent<Props, StateProps> {
  static defaultProps = {
    onRename: null,
    isSimplified: false,
    isFromAddressManager: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isToggled: false,
    }
  }

  handleLinkClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  handleToggle = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault()
    this.setState({ isToggled: !this.state.isToggled })
    event.stopPropagation()
  }

  handleCopyAddress = (event: SyntheticEvent<HTMLSpanElement>) => {
    const {
      id,
      i18n,
    }: Props = this.props

    this.setState({ isToggled: false })
    const address: Address = walletsPlugin.getAddress(id)
    clipboard.copyText(address)

    toastsPlugin.showToast(i18n._(
      'common.WalletActions.toast',
      null,
      { defaults: 'Address Copied.' },
    ))

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
      i18n,
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
              {i18n._('common.WalletActions.copy', null, { defaults: 'Copy Wallet Address' })}
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
              {i18n._('common.WalletActions.rename', null, { defaults: 'Rename Wallet' })}
            </button>
          )}
          {isReadOnly && (
            <JLink
              onClick={this.handleLinkClick}
              href={`/wallets/${id}/upgrade`}
              className={walletActionsStyle.action}
            >
              {i18n._('common.WalletActions.unlock', null, { defaults: 'Unlock Features' })}
            </JLink>
          )}
          {isMultiAddressWallet && !isSimplified && !isFromAddressManager && (
            <JLink
              onClick={this.handleLinkClick}
              href={`/wallets/${id}/addresses`}
              className={walletActionsStyle.action}
            >
              {i18n._(
                'common.WalletActions.manageAddresses',
                null,
                { defaults: 'Manage Addresses' },
              )}
            </JLink>
          )}
          {isMultiAddressWallet && (
            <JLink
              onClick={this.handleLinkClick}
              className={walletActionsStyle.action}
              href={`/wallets/${id}/mode-${isSimplified ? 'enable' : 'disable'}`}
            >
              {isSimplified
                ? i18n._(
                  'common.WalletActions.multiaddress.enable',
                  null,
                  { defaults: 'Enable Multi-Address Mode' },
                )
                : i18n._(
                  'common.WalletActions.multiaddress.disable',
                  null,
                  { defaults: 'Disable Multi-Address Mode' },
                )
              }
            </JLink>
          )}
          {!isReadOnly && (
            <JLink
              onClick={this.handleLinkClick}
              href={`/wallets/${id}/backup`}
              className={walletActionsStyle.action}
            >
              {i18n._('common.WalletActions.backup', null, { defaults: 'Backup Wallet' })}
            </JLink>
          )}
          <JLink
            onClick={this.handleLinkClick}
            href={`/wallets/${id}/delete`}
            className={walletActionsStyle.action}
          >
            {i18n._('common.WalletActions.delete', null, { defaults: 'Delete Wallet' })}
          </JLink>
        </div>
      </div>
    )
  }
}

export const WalletActions = withI18n()(WalletActionsComponent)
