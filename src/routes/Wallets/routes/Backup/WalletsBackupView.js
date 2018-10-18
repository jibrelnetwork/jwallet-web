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

type ComponentState = {
  type: WalletType,
}

class WalletsBackupView extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: 'mnemonic',
    }
  }

  componentDidMount() {
    const {
      openView,
      params,
    } = this.props

    openView(params.walletId)
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      items,
      params,
    }: Props = nextProps

    const foundWallet: ?Wallet = items.find((w: Wallet): boolean => (w.id === params.walletId))

    if (foundWallet && (foundWallet.type !== this.state.type)) {
      this.setState({ type: foundWallet.type })
    }
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      goToNextStep,
      goToPrevStep,
      downloadToTxt,
      copyToClipboard,
      changePasswordInput,
      params,
      invalidFields,
      data,
      password,
      currentStep,
      isLoading,
    } = this.props

    const isMnemonic: boolean = (this.state.type === 'mnemonic')

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
                <CopyableField
                  copy={copyToClipboard}
                  value={isMnemonic ? data : `${data.substr(0, 33)} ${data.substr(33)}`}
                />
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
