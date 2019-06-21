// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { walletsPlugin } from 'store/plugins'

import {
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

import walletsItemDeleteStyle from './walletsItemDelete.m.scss'

export type Props = {|
  +goBackToWallets: () => any,
  +walletId: string,
|}

const DELETE_TEXT: string =
  t`This action will delete the wallet from this device. You can restore it using wallet
  backup phrase. If the wallet is not backed up, it will be gone forever.`

const DELETE_CONFIRM_TIMEOUT: number = 15

export class WalletsItemDeleteView extends PureComponent<Props> {
  handleRemove = () => {
    walletsPlugin.removeWallet(this.props.walletId)
  }

  render() {
    const handleBack = this.props.goBackToWallets

    return (
      <div className={walletsItemDeleteStyle.core}>
        <UserActionInfo
          text={DELETE_TEXT}
          title={t`Delete Wallet`}
          iconClassName={walletsItemDeleteStyle.icon}
          iconName='ic_delete_48-use-fill'
        />
        <div className={walletsItemDeleteStyle.buttons}>
          <ButtonWithConfirm
            onCancel={handleBack}
            onConfirm={this.handleRemove}
            labelConfirm={t`Delete`}
            labelCancel={t`Keep Wallet`}
            confirmTimeout={DELETE_CONFIRM_TIMEOUT}
          />
        </div>
      </div>
    )
  }
}
