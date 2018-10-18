// @flow

import React, { Component } from 'react'

import handle from 'utils/eventHandlers/handle'
import { JRaisedButton } from 'components/base'
import { ModalHeader, CopyableField, WalletPasswordStep } from 'components'

import { STEPS } from './modules/walletsBackup'

type Props = {|
  +closeView: () => void,
  +goToNextStep: () => void,
  +goToPrevStep: () => void,
  +downloadToTxt: () => void,
  +openView: (string) => void,
  +copyToClipboard: () => void,
  +changePasswordInput: (string) => void,
  +items: Wallets,
  +invalidFields: FormFields,
  +params: {|
    +walletId: string,
  |},
  +data: string,
  +password: string,
  +currentStep: WalletsBackupStepIndex,
  +isLoading: boolean,
|}

class WalletsBackupView extends Component<Props> {
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

  getData = (isMnemonic: boolean) => {
    const { data } = this.props

    if (isMnemonic) {
      return data
    }

    // we should split data on two lines if it is privateKey
    const firstLine: string = data.substr(0, 33)
    const secondLine: string = data.substr(33)

    return `${firstLine} ${secondLine}`
  }

  render() {
    const {
      goToNextStep,
      goToPrevStep,
      downloadToTxt,
      copyToClipboard,
      changePasswordInput,
      items,
      params,
      invalidFields,
      password,
      currentStep,
      isLoading,
    } = this.props

    const foundWallet: ?Wallet = items.find((w: Wallet): boolean => (w.id === params.walletId))

    if (!foundWallet) {
      return null
    }

    const isMnemonic: boolean = (foundWallet.type === 'mnemonic')

    return (
      <div className='wallets-backup-view'>
        <ModalHeader
          onBack={goToPrevStep}
          color='white'
          location='/wallets'
          title='Backup wallet'
        />
        <div className='content'>
          {(currentStep === STEPS.PASSWORD) && (
            <WalletPasswordStep
              onSubmit={handle(goToNextStep)(params.walletId)}
              onChangePassword={changePasswordInput}
              invalidFields={invalidFields}
              valuePassword={password}
              isLoading={isLoading}
              isPasswordExists
            />
          )}
          {(currentStep === STEPS.PRIVATE) && (
            <div className='wallet-private-step'>
              <form className='form' onSubmit={downloadToTxt}>
                <CopyableField copy={copyToClipboard} value={this.getData(isMnemonic)} />
                <div className='actions'>
                  <JRaisedButton
                    onClick={downloadToTxt}
                    color='blue'
                    loaderColor='white'
                    label='Download as TXT'
                    isLoading={isLoading}
                    isWide
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default WalletsBackupView
