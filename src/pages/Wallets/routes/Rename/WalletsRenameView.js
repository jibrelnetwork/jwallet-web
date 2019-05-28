// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import handle from 'utils/eventHandlers/handle'

import {
  ModalHeader,
  WalletNameStep,
} from 'components'

export type Props = {|
  +rename: Function,
  +openView: Function,
  +closeView: Function,
  +goToWallets: () => void,
  +changeNameInput: (string) => void,
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
          title={t`Rename wallet`}
        />
        <div className='content'>
          <WalletNameStep
            onSubmit={handle(rename)(items, name, params.walletId)}
            onChangeName={changeNameInput}
            invalidFields={invalidFields}
            valueName={name}
            buttonLabel={t`OK`}
            fieldName='wallets-name'
            placeholder={t`Wallet name`}
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  }
}

export default WalletsRenameView
