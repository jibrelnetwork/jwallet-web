// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'
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
        )}
      >
        <div
          onClick={this.handleToggle}
          className={classNames(
            walletCardActionsStyles.overlay,
            'overlay',
          )}
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
        {isToggled && (
          <ul className={walletCardActionsStyles.actions}>
            {hasSingleAddress && (
              <li className={walletCardActionsStyles.action}>
                <span
                  onClick={this.handleCopyAddress}
                  className={walletCardActionsStyles.label}
                >
                  {t`Copy Wallet Address`}
                </span>
              </li>
            )}
            <li className={walletCardActionsStyles.action}>
              <span
                onClick={this.handleRename}
                className={walletCardActionsStyles.label}
              >
                {t`Rename Wallet`}
              </span>
            </li>
            <li className={walletCardActionsStyles.action}>
              <JLink
                href={`/wallets/${id}/upgrade`}
                className={walletCardActionsStyles.label}
              >
                {t`Unlock Features`}
              </JLink>
            </li>
            <li className={walletCardActionsStyles.action}>
              <JLink
                href={`/wallets/${id}/addresses`}
                className={walletCardActionsStyles.label}
              >
                {t`Manage Addresses`}
              </JLink>
            </li>
            {isMultiAddressWallet && (
              <li className={walletCardActionsStyles.action}>
                <JLink
                  href={`/wallets/${id}/mode`}
                  className={walletCardActionsStyles.label}
                >
                  {isSimplified
                    ? t`Enable Multi-Address Mode`
                    : t`Disable Multi-Address Mode`
                  }
                </JLink>
              </li>
            )}
            {!isReadOnly && (
              <li className={walletCardActionsStyles.action}>
                <JLink
                  href={`/wallets/${id}/backup`}
                  className={walletCardActionsStyles.label}
                >
                  {t`Backup Wallet`}
                </JLink>
              </li>
            )}
            <li className={walletCardActionsStyles.action}>
              <JLink
                href={`/wallets/${id}/delete`}
                className={walletCardActionsStyles.label}
              >
                {t`Delete Wallet`}
              </JLink>
            </li>
          </ul>
        )}
      </div>
    )
  }
}
