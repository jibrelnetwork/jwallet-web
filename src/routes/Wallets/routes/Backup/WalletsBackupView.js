// @flow

import React, { Component } from 'react'

import handle from 'utils/eventHandlers/handle'

import getWallet from 'utils/wallets/getWallet'

import {
  WalletStep,
  ModalHeader,
  CopyableField,
  WalletPasswordStep,
} from 'components'

import { STEPS } from './modules/walletsBackup'

type Props = {|
  +closeView: () => void,
  +goToNextStep: (walletId: string) => void,
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

const PRIVATE_KEY_LENGTH: number = 66
const PRIVATE_KEY_HALF_LENGTH: number = PRIVATE_KEY_LENGTH / 2

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
    const firstLine: string = data.substr(0, PRIVATE_KEY_HALF_LENGTH)
    const secondLine: string = data.substr(PRIVATE_KEY_HALF_LENGTH)

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

    try {
      const foundWallet: Wallet = getWallet(items, params.walletId)
      const isMnemonic: boolean = (foundWallet.type === 'mnemonic')

      return (
        <div className='wallets-view -backup'>
          <ModalHeader
            onBack={goToPrevStep}
            color='white'
            title='Backup wallet'
            isDisabled={isLoading}
          />
          <div className='content'>
            {(currentStep === STEPS.PASSWORD) && (
              <WalletPasswordStep
                onSubmit={handle(goToNextStep)(params.walletId)}
                onChangePassword={changePasswordInput}
                invalidFields={invalidFields}
                valuePassword={password}
                buttonLabel='OK'
                isLoading={isLoading}
                isPasswordExists
              />
            )}
            {(currentStep === STEPS.PRIVATE) && (
              <WalletStep
                onSubmit={downloadToTxt}
                title={[
                  'This backup phrase is the only way to restore access to your',
                  'funds. Keep it secure!',
                ]}
                buttonLabel='Download as TXT'
                isLoading={isLoading}
              >
                <CopyableField copy={copyToClipboard} value={this.getData(isMnemonic)} />
              </WalletStep>
            )}
          </div>
        </div>
      )
    } catch (err) {
      console.error(err)
      return null
    }
  }
}

export default WalletsBackupView
