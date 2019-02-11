// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import handle from 'utils/eventHandlers/handle'
import { ModalHeader, WalletNameStep } from 'components'

type Props = {|
  +closeView: () => void,
  +openView: (string) => void,
  +goToWalletsAddresses: () => void,
  +changeNameInput: (string) => void,
  +renameAddress: (string, string) => void,
  +invalidFields: FormFields,
  +params: {|
    +address: string,
  |},
  +name: string,
|}

class WalletsRenameView extends Component<Props> {
  componentDidMount() {
    const {
      openView,
      params,
    } = this.props

    openView(params.address)
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      renameAddress,
      changeNameInput,
      goToWalletsAddresses,
      invalidFields,
      params,
      name,
    } = this.props

    return (
      <div className='wallets-view -rename-address'>
        <ModalHeader
          onBack={goToWalletsAddresses}
          color='white'
          title={t`Rename address`}
        />
        <div className='content'>
          <WalletNameStep
            onSubmit={handle(renameAddress)(params.address, name)}
            onChangeName={changeNameInput}
            invalidFields={invalidFields}
            valueName={name}
            buttonLabel={t`OK`}
            fieldName='address-name'
            placeholder={t`Address name`}
          />
        </div>
      </div>
    )
  }
}

export default WalletsRenameView
