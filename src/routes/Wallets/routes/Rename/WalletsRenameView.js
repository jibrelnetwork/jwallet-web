// @flow

import React, { Component } from 'react'

import handle from 'utils/eventHandlers/handle'
import ModalHeader from 'components/ModalHeader'
import WalletNameStep from 'components/WalletNameStep'

type Props = {|
  +closeView: () => void,
  +openView: (string) => void,
  +changeNameInput: (string) => void,
  +renameRequest: (Wallets, string, string) => void,
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
      renameRequest,
      changeNameInput,
      items,
      invalidFields,
      params,
      name,
      isLoading,
    } = this.props

    return (
      <div className='wallets-rename-view'>
        <ModalHeader title='Rename wallet' color='white' location='/wallets' />
        <div className='content'>
          <WalletNameStep
            onSubmit={handle(renameRequest)(items, name, params.walletId)}
            onChangeName={changeNameInput}
            invalidFields={invalidFields}
            valueName={name}
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  }
}

export default WalletsRenameView
