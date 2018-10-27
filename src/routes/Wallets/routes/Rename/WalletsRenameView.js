// @flow

import React, { Component } from 'react'

import handle from 'utils/eventHandlers/handle'
import ModalHeader from 'components/ModalHeader'
import WalletNameStep from 'components/WalletNameStep'

type Props = {|
  +closeView: () => void,
  +goToWallets: () => void,
  +openView: (string) => void,
  +changeNameInput: (string) => void,
  +rename: (Wallets, string, string) => void,
  +items: Wallets,
  +invalidFields: FormFields,
  +params: {|
    +walletId: string,
  |},
  +name: string,
  +isLoading: boolean,
|}

class WalletsRenameView extends Component<Props> {
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
      rename,
      goToWallets,
      changeNameInput,
      items,
      invalidFields,
      params,
      name,
      isLoading,
    } = this.props

    return (
      <div className='wallets-view -rename'>
        <ModalHeader
          onBack={goToWallets}
          color='white'
          title='Rename wallet'
        />
        <div className='content'>
          <WalletNameStep
            onSubmit={handle(rename)(items, name, params.walletId)}
            onChangeName={changeNameInput}
            invalidFields={invalidFields}
            valueName={name}
            buttonLabel='OK'
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  }
}

export default WalletsRenameView
