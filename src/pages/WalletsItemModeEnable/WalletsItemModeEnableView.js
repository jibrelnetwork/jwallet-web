// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { walletsPlugin } from 'store/plugins'

import {
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

import walletsItemModeEnableStyle from './walletsItemModeEnable.m.scss'

export type Props = {|
  +goBackToWallets: () => any,
  +walletId: string,
|}

export class WalletsItemModeEnableView extends PureComponent<Props> {
  handleEnable = () => {
    walletsPlugin.switchMode(this.props.walletId)
  }

  render() {
    const handleBack = this.props.goBackToWallets

    return (
      <div className={walletsItemModeEnableStyle.core}>
        <UserActionInfo
          text={t`You will be able to create multiple addresses within this wallet.
          They will have a common backup phrase.`}
          title={t`Enable Multi-Address Mode`}
          iconClassName={walletsItemModeEnableStyle.icon}
          iconName='ic_attention_48-use-fill'
        />
        <div className={walletsItemModeEnableStyle.buttons}>
          <ButtonWithConfirm
            onCancel={handleBack}
            onConfirm={this.handleEnable}
            labelConfirm={t`Enable`}
            labelCancel={t`Do It Later`}
          />
        </div>
      </div>
    )
  }
}
