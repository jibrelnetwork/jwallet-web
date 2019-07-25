// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import buttonStyles from 'components/base/Button/button.m.scss'
import titleHeaderStyles from 'components/TitleHeader/titleHeader.m.scss'
import { walletsPlugin } from 'store/plugins'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from './addressChooser.m.scss'
import { AddressChooserItem } from './AddressChooserItem'

export type Props = {|
  +onClose: (e: Event) => any,
  +walletId: WalletId,
  +activeIndex: number,
  +derivationIndex: number,
  +isOpen: boolean,
  +i18n: I18nType,
|}

class AddressChooserComponent extends Component<Props> {
  bodyRef = React.createRef<HTMLDivElement>()

  componentDidUpdate({ isOpen }: Props) {
    if (!isOpen && this.props.isOpen && this.bodyRef && this.bodyRef.current) {
      this.bodyRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }
  }

  handleChooseAddress = (e: Event, addressIndex: number) => {
    const {
      onClose,
      walletId,
    }: Props = this.props

    onClose(e)
    walletsPlugin.setActiveAddress(walletId, addressIndex)
  }

  render() {
    const {
      onClose: handleClose,
      walletId,
      activeIndex,
      derivationIndex,
      isOpen,
      i18n,
    }: Props = this.props

    return (
      <div
        className={classNames(
          styles.core,
          isOpen && styles.open,
        )}
      >
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.title}>
              {i18n._(
                'common.WalletCard.AddressChooser.choose',
                null,
                { defaults: 'Choose Address' },
              )}
            </div>
            <JLink
              href={`/wallets/${walletId}/addresses`}
              className={classNames(styles.manage, buttonStyles.additionalIcon)}
            >
              <JIcon
                name='ic_manage_24-use-fill'
                className={titleHeaderStyles.icon}
              />
              <span className={titleHeaderStyles.label}>
                {i18n._(
                  'common.WalletCard.AddressChooser.manage',
                  null,
                  { defaults: 'Manage' },
                )}
              </span>
            </JLink>
            <button
              onClick={handleClose}
              className={styles.close}
              type='button'
            >
              <JIcon name='ic_close_24-use-fill' />
            </button>
          </div>
          <div
            ref={this.bodyRef}
            className={styles.body}
          >
            <div className={styles.list}>
              {walletsPlugin.getAddresses(
                walletId,
                0,
                derivationIndex,
              ).map((
                address: Address,
                index: number,
              ) => (
                <AddressChooserItem
                  onClick={this.handleChooseAddress}
                  key={address}
                  index={index}
                  address={address}
                  isActive={(index === activeIndex)}
                />
              ))}
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            onClick={handleClose}
            className={styles.overlay}
          />
        )}
      </div>
    )
  }
}

export const AddressChooser = withI18n()(
  AddressChooserComponent,
)
