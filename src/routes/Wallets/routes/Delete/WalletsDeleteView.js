// @flow

import React, { Component } from 'react'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import getWallet from 'utils/wallets/getWallet'
import JThumbnail from 'components/base/JThumbnail'
import { ModalHeader, ButtonWithConfirm } from 'components'

type Props = {|
  +closeView: () => void,
  +goToWallets: () => void,
  +openView: (string) => void,
  +remove: (Wallets, string) => void,
  +items: Wallets,
  +params: {|
    +walletId: string,
  |},
|}

class WalletsDeleteView extends Component<Props> {
  componentDidMount() {
    const { openView, params } = this.props
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

    return (
      <div className='wallets-view -delete'>
        <ModalHeader
          onBack={goToWallets}
          color='white'
          title='Delete wallet'
        />
        <div className='content'>
          <div className='form'>
            <JThumbnail
              color='white'
              iconSize='xlarge'
              image='auth-cross'
              title={`Delete ${foundWallet.name}?`}
              description={[
                'All user data, including imported or generated private keys, will be deleted.',
                'The only way to restore deleted wallet is to use the backup phrase.',
              ]}
            />
            <div className='actions'>
              <ButtonWithConfirm
                onClick={handle(remove)(items, walletId)}
                onCancelClick={goToWallets}
                color='white'
                labelConfirm='Yes'
                label='Yes, delete'
                labelCancel='Nope, stop it'
                confirmTimeout={config.deleteConfirmTimeout}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WalletsDeleteView
