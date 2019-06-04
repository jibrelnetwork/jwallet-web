// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { JIcon } from 'components/base'
import { walletsPlugin } from 'store/plugins'
import { ButtonWithConfirm } from 'components'

import walletsItemDeleteStyle from './walletsItemDelete.m.scss'

export type Props = {|
  +goBackToWallets: () => void,
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
    const {
      goBackToWallets: handleBack,
    }: Props = this.props

    /* eslint-disable react/no-danger */
    return (
      <div className={walletsItemDeleteStyle.core}>
        <JIcon
          className={walletsItemDeleteStyle.icon}
          name='ic_delete_48-use-fill'
        />
        <h2 className={walletsItemDeleteStyle.title}>{t`Delete Wallet`}</h2>
        <p
          className={walletsItemDeleteStyle.text}
          dangerouslySetInnerHTML={{
            __html: DELETE_TEXT.split('\n').join('<br />'),
          }}
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
    /* eslint-enable react/no-danger */
  }
}
