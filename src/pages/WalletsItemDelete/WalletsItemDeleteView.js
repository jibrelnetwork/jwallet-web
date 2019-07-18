// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { walletsPlugin } from 'store/plugins'

import {
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

import walletsItemDeleteStyle from './walletsItemDelete.m.scss'

export type Props = {|
  +goBackToWallets: () => any,
  +walletId: string,
  +i18n: I18nType,
|}

const DELETE_CONFIRM_TIMEOUT: number = 15

class WalletsItemDeleteViewComponent extends PureComponent<Props> {
  handleRemove = () => {
    walletsPlugin.removeWallet(this.props.walletId)
  }

  render() {
    const { i18n } = this.props
    const handleBack = this.props.goBackToWallets

    const DELETE_TEXT = i18n._(
      'WalletsItemDelete.description',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'This action will delete the wallet from this device. You can restore it using wallet \nbackup phrase. If the wallet is not backed up, it will be gone forever.' },
    )

    return (
      <div className={walletsItemDeleteStyle.core}>
        <UserActionInfo
          text={DELETE_TEXT}
          title={i18n._('WalletsItemDelete.title', null, { defaults: 'Delete Wallet' })}
          iconClassName={walletsItemDeleteStyle.icon}
          iconName='ic_delete_48-use-fill'
        />
        <div className={walletsItemDeleteStyle.buttons}>
          <ButtonWithConfirm
            onCancel={handleBack}
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

export const WalletsItemDeleteView = withI18n()(
  WalletsItemDeleteViewComponent,
)
