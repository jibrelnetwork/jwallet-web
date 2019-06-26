// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

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
    return (
      <div className={walletsItemModeDisableStyle.core}>
        <UserActionInfo
          text={t`This action will leave only one active wallet address of your choice.
          You will be able return to the multi-address mode at any time and get access to all
          your currently available addresses.`}
          title={t`Disable Multi-Address Mode`}
          iconClassName={walletsItemModeDisableStyle.icon}
          iconName='ic_attention_48-use-fill'
        />
        <div className={walletsItemModeDisableStyle.buttons}>
          <Button
            onClick={this.handleDisable}
            theme='general'
          >
            {t`Disable`}
          </Button>
        </div>
      </div>
    )
  }
}
