// @flow

import React, { Component } from 'react'

import handle from 'utils/eventHandlers/handle'
import { JRaisedButton } from 'components/base'
import { ModalHeader, MnemonicPhrase, WalletPasswordStep } from 'components'

import { STEPS } from './modules/walletsBackup'

type Props = {|
  +closeView: () => void,
  +goToNextStep: () => void,
  +goToPrevStep: () => void,
  +openView: (string) => void,
  +changePasswordInput: (string) => void,
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

  render() {
    const {
      goToNextStep,
      goToPrevStep,
      changePasswordInput,
      params,
      invalidFields,
      data,
      password,
      currentStep,
      isLoading,
    } = this.props

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
              <form className='form' onSubmit={console.log}>
                <MnemonicPhrase
                  copy={console.log}
                  download={console.log}
                  mnemonic={data}
                />
                <div className='actions'>
                  <JRaisedButton
                    onClick={console.log}
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
