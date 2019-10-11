// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { gaSendEvent } from 'utils/analytics'

import {
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

import {
  toastsPlugin,
  walletsPlugin,
} from 'store/plugins'

import styles from './walletsItemDelete.m.scss'

export type Props = {|
  +goBackToWallets: () => any,
  +i18n: I18n,
  +walletId: string,
|}

const DELETE_CONFIRM_TIMEOUT: number = 15

class WalletsItemDeleteView extends PureComponent<Props> {
  handleBack = () => {
    this.props.goBackToWallets()

    gaSendEvent(
      'DeleteWallet',
      'WalletKept',
    )
  }

  handleRemove = () => {
    const {
      i18n,
      walletId,
    }: Props = this.props

    walletsPlugin.removeWallet(walletId)

    toastsPlugin.showToast(i18n._(
      'WalletsItemDelete.toast',
      null,
      { defaults: 'Wallet deleted.' },
    ))

    gaSendEvent(
      'DeleteWallet',
      'WalletDeleted',
    )
  }

  render() {
    const { i18n }: Props = this.props

    const DELETE_TEXT = i18n._(
      'WalletsItemDelete.description',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'This action will delete the wallet from this device. You can restore it using wallet \nbackup phrase. If the wallet is not backed up, it will be gone forever.' },
    )

    return (
      <div className={styles.core}>
        <UserActionInfo
          text={DELETE_TEXT}
          title={i18n._('WalletsItemDelete.title', null, { defaults: 'Delete Wallet' })}
          iconClassName={styles.icon}
          iconName='ic_delete_48-use-fill'
        />
        <div className={styles.buttons}>
          <ButtonWithConfirm
            onCancel={this.handleBack}
            onConfirm={this.handleRemove}
            labelConfirm={i18n._('WalletsItemDelete.actions.submit', null, { defaults: 'Delete' })}
            labelCancel={i18n._(
              'WalletsItemDelete.actions.cancel',
              null,
              { defaults: 'Keep Wallet' },
            )}
            confirmTimeout={DELETE_CONFIRM_TIMEOUT}
            isReversed
          />
        </div>
      </div>
    )
  }
}

const WalletsItemDeleteViewEnhanced = withI18n()(WalletsItemDeleteView)
export { WalletsItemDeleteViewEnhanced as WalletsItemDeleteView }
