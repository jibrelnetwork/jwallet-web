// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { Button } from 'components/base'
import { UserActionInfo } from 'components'
import { walletsPlugin } from 'store/plugins'

import walletsItemModeDisableStyle from './walletsItemModeDisable.m.scss'

export type Props = {|
  +walletId: string,
  +i18n: I18nType,
|}

class WalletsItemModeDisableComponent extends PureComponent<Props> {
  handleDisable = () => {
    walletsPlugin.switchMode(this.props.walletId)
  }

  render() {
    const { i18n } = this.props

    /* eslint-disable max-len */
    return (
      <div className={walletsItemModeDisableStyle.core}>
        <UserActionInfo
          text={i18n._('WalletsItemModeDisable.description', null, { defaults: 'This action will leave only one active wallet address of your choice. \nYou will be able return to the multi-address mode at any time and get access to all \nyour currently available addresses.' })}
          title={i18n._('WalletsItemModeDisable.title', null, { defaults: 'Disable Multi-Address Mode' })}
          iconClassName={walletsItemModeDisableStyle.icon}
          iconName='ic_attention_48-use-fill'
        />
        <div className={walletsItemModeDisableStyle.buttons}>
          <Button
            onClick={this.handleDisable}
            theme='general'
          >
            {i18n._('WalletsItemModeDisable.actions.submit', null, { defaults: 'Disable' })}
          </Button>
        </div>
      </div>
    )
    /* eslint-enable max-len */
  }
}

export const WalletsItemModeDisable = withI18n()(
  WalletsItemModeDisableComponent,
)
