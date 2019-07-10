// @flow strict

import React, { PureComponent } from 'react'
import { i18n } from 'i18n/lingui'

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

    /* eslint-disable max-len */
    return (
      <div className={walletsItemModeEnableStyle.core}>
        <UserActionInfo
          text={i18n._('WalletsItemModeEnable.description', null, { defaults: 'You will be able to create multiple addresses within this wallet. \nThey will have a common backup phrase.' })}
          title={i18n._('WalletsItemModeEnable.title', null, { defaults: 'Enable Multi-Address Mode' })}
          iconClassName={walletsItemModeEnableStyle.icon}
          iconName='ic_attention_48-use-fill'
        />
        <div className={walletsItemModeEnableStyle.buttons}>
          <ButtonWithConfirm
            onCancel={handleBack}
            onConfirm={this.handleEnable}
            labelConfirm={i18n._('WalletsItemModeEnable.actions.submit', null, { defaults: 'Enable' })}
            labelCancel={i18n._('WalletsItemModeEnable.actions.cancel', null, { defaults: 'Do It Later' })}
          />
        </div>
      </div>
    )
    /* eslint-enable max-len */
  }
}
