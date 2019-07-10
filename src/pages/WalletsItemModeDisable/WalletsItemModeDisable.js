// @flow strict

import React, { PureComponent } from 'react'
import { i18n } from 'i18n/lingui'

import { Button } from 'components/base'
import { UserActionInfo } from 'components'
import { walletsPlugin } from 'store/plugins'

import walletsItemModeDisableStyle from './walletsItemModeDisable.m.scss'

export type Props = {|
  +walletId: string,
|}

export class WalletsItemModeDisable extends PureComponent<Props> {
  handleDisable = () => {
    walletsPlugin.switchMode(this.props.walletId)
  }

  render() {
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
