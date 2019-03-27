// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import getWallet from 'utils/wallets/getWallet'
import JThumbnail from 'components/base/JThumbnail'

import {
  ModalHeader,
  ButtonWithConfirm,
} from 'components'

type Props = {|
  +remove: Function,
  +openView: Function,
  +closeView: Function,
  +goToWallets: Function,
  +items: Wallets,
  +params: {|
    +walletId: string,
  |},
|}

class WalletsDeleteView extends Component<Props> {
  componentDidMount() {
    const {
      openView,
      params,
    } = this.props

    openView(params.walletId)
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      remove,
      goToWallets,
      items,
      params: {
        walletId,
      },
    }: Props = this.props

    const foundWallet: Wallet = getWallet(items, walletId)

    const description: string[] =
      (t`All user data, including imported or generated private keys, will be deleted.
      The only way to restore deleted wallet is to use the backup phrase.`).split('\n')

    return (
      <div className='wallets-view -delete'>
        <ModalHeader
          onBack={goToWallets}
          color='white'
          title={t`Delete wallet`}
        />
        <div className='content'>
          <div className='form'>
            <JThumbnail
              color='white'
              image='auth-cross'
              title={t`Delete ${foundWallet.name}?`}
              description={description}
              isTransparent
            />
            <div className='actions'>
              <ButtonWithConfirm
                onClick={handle(remove)(items, walletId)}
                onCancelClick={goToWallets}
                color='white'
                labelConfirm={t`Yes`}
                labelCancel={t`Nope, stop it`}
                confirmTimeout={config.deleteConfirmTimeout}
                isActive
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WalletsDeleteView
