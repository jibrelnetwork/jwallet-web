// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { clipboard } from 'services'
import { gaSendEvent } from 'utils/analytics'

import {
  toastsPlugin,
  walletsPlugin,
} from 'store/plugins'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from './walletCardActions.m.scss'

type Props = {|
  +onRename: () => void,
  +i18n: I18n,
  +id: WalletId,
  +type: WalletCustomType,
  +isSimplified: ?boolean,
|}

type StateProps = {|
  isToggled: boolean,
|}

class WalletCardActions extends PureComponent<Props, StateProps> {
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
    const {
      id,
      i18n,
    }: Props = this.props

    this.setState({ isToggled: false })
    const address: Address = walletsPlugin.getAddress(id)
    clipboard.copyText(address)

    toastsPlugin.showToast(i18n._(
      'common.WalletCardActions.toast',
      null,
      { defaults: 'Address Copied.' },
    ))

    event.stopPropagation()

    gaSendEvent(
      'WalletManager',
      'CurrentAddressCopied',
    )
  }

  handleRename = (event: SyntheticEvent<HTMLSpanElement>) => {
    this.setState({ isToggled: false })
    this.props.onRename()
    event.stopPropagation()

    gaSendEvent(
      'WalletManager',
      'RenameStarted',
    )
  }

  render() {
    const {
      id,
      type,
      i18n,
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
          styles.core,
          isToggled && styles.toggled,
          '__wallet-card-actions',
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
              {i18n._(
                'common.WalletCard.action.copyWalletAddress',
                null,
                { defaults: 'Copy Wallet Address' },
              )}
            </button>
          )}
          <button
            type='button'
            onClick={this.handleRename}
            className={classNames(
              styles.action,
              styles['-button'],
            )}
          >
            {i18n._(
              'common.WalletCard.action.renameWallet',
              null,
              { defaults: 'Rename Wallet' },
            )}
          </button>
          <JLink
            href={`/wallets/${id}/upgrade`}
            className={styles.action}
          >
            {i18n._(
              'common.WalletCard.action.unlock',
              null,
              { defaults: 'Unlock Features' },
            )}
          </JLink>
          <JLink
            href={`/wallets/${id}/addresses`}
            className={styles.action}
          >
            {i18n._(
              'common.WalletCard.action.addresses',
              null,
              { defaults: 'Manage Addresses' },
            )}
          </JLink>
          {isMultiAddressWallet && (
            <JLink
              className={styles.action}
              href={`/wallets/${id}/mode-${isSimplified ? 'enable' : 'disable'}`}
            >
              {isSimplified
                ? i18n._(
                  'common.WalletCard.action.enableMulti',
                  null,
                  { defaults: 'Enable Multi-Address Mode' },
                )
                : i18n._(
                  'common.WalletCard.action.disableMulti',
                  null,
                  { defaults: 'Disable Multi-Address Mode' },
                )
              }
            </JLink>
          )}
          {!isReadOnly && (
            <JLink
              href={`/wallets/${id}/backup`}
              className={styles.action}
            >
              {i18n._(
                'common.WalletCard.action.backup',
                null,
                { defaults: 'Backup Wallet' },
              )}
            </JLink>
          )}
          <JLink
            href={`/wallets/${id}/delete`}
            className={styles.action}
          >
            {i18n._(
              'common.WalletCard.action.delete',
              null,
              { defaults: 'Delete Wallet' },
            )}
          </JLink>
        </div>
      </div>
    )
  }
}

const WalletCardActionsEnhanced = withI18n()(WalletCardActions)
export { WalletCardActionsEnhanced as WalletCardActions }
