// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import clipboard from 'services/clipboard'

import {
  toastsPlugin,
  walletsPlugin,
} from 'store/plugins'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from './walletActions.m.scss'

type RenameHandler = () => any

type Props = {|
  +onRename: ?RenameHandler,
  +i18n: I18n,
  +id: WalletId,
  +type: WalletCustomType,
  +isSimplified: ?boolean,
  +isFromAddressManager: ?boolean,
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
      onRename,
      i18n,
      id,
      type,
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
          styles.core,
          isToggled && styles.toggled,
        )}
      >
        <div
          onClick={this.handleToggle}
          className={styles.overlay}
        />
        <div
          onClick={this.handleToggle}
          className={styles.icon}
        >
          <JIcon
            color='white'
            name='kebab-menu-use-fill'
          />
        </div>
        <div className={classNames(
          styles.actions,
          !isToggled && styles['-hide'],
        )}
        >
          {hasSingleAddress && (
            <button
              type='button'
              onClick={this.handleCopyAddress}
              className={classNames(
                styles.action,
                styles['-button'],
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
                styles.action,
                styles['-button'],
              )}
            >
              {i18n._('common.WalletActions.rename', null, { defaults: 'Rename Wallet' })}
            </button>
          )}
          {isReadOnly && (
            <JLink
              onClick={this.handleLinkClick}
              href={`/wallets/${id}/upgrade`}
              className={styles.action}
            >
              {i18n._('common.WalletActions.unlock', null, { defaults: 'Unlock Features' })}
            </JLink>
          )}
          {isMultiAddressWallet && !isSimplified && !isFromAddressManager && (
            <JLink
              onClick={this.handleLinkClick}
              href={`/wallets/${id}/addresses`}
              className={styles.action}
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
              className={styles.action}
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
              className={styles.action}
            >
              {i18n._('common.WalletActions.backup', null, { defaults: 'Backup Wallet' })}
            </JLink>
          )}
          <JLink
            onClick={this.handleLinkClick}
            href={`/wallets/${id}/delete`}
            className={styles.action}
          >
            {i18n._('common.WalletActions.delete', null, { defaults: 'Delete Wallet' })}
          </JLink>
        </div>
      </div>
    )
  }
}

export const WalletActions = withI18n()(WalletActionsComponent)
