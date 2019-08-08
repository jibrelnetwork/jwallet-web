// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  toastsPlugin,
  walletsPlugin,
} from 'store/plugins'

import {
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

import walletsItemModeEnableStyle from './walletsItemModeEnable.m.scss'

export type Props = {|
  +goBackToWallets: () => any,
  +walletId: string,
  +i18n: I18nType,
|}

class WalletsItemModeEnableViewComponent extends PureComponent<Props> {
  handleEnable = () => {
    const {
      i18n,
      walletId,
    }: Props = this.props

    walletsPlugin.switchMode(walletId)

    toastsPlugin.showToast(i18n._(
      'WalletsItemModeEnable.toast',
      null,
      { defaults: 'Multi-address Mode enabled' },
    ))
  }

  render() {
    const {
      i18n,
      goBackToWallets: handleBack,
    } = this.props

    return (
      <div className={walletsItemModeEnableStyle.core}>
        <UserActionInfo
          text={i18n._(
            'WalletsItemModeEnable.description',
            null,
            /* eslint-disable-next-line max-len */
            { defaults: 'You will be able to create multiple addresses within this wallet. \nThey will have a common backup phrase.' },
          )}
          title={i18n._(
            'WalletsItemModeEnable.title',
            null,
            { defaults: 'Enable Multi-Address Mode' },
          )}
          iconClassName={walletsItemModeEnableStyle.icon}
          iconName='ic_attention_48-use-fill'
        />
        <div className={walletsItemModeEnableStyle.buttons}>
          <ButtonWithConfirm
            onCancel={handleBack}
            onConfirm={this.handleEnable}
            labelConfirm={i18n._(
              'WalletsItemModeEnable.actions.submit',
              null,
              { defaults: 'Enable' },
            )}
            labelCancel={i18n._(
              'WalletsItemModeEnable.actions.cancel',
              null,
              { defaults: 'Do It Later' },
            )}
          />
        </div>
      </div>
    )
  }
}

export const WalletsItemModeEnableView = withI18n()(
  WalletsItemModeEnableViewComponent,
)
