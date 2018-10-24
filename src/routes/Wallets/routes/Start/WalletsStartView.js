// @flow

import React, { Component } from 'react'

import { JText, JFlatButton } from 'components/base'
import { WalletHeader, NewWalletButtons } from 'components'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +goToTerms: () => void,
  +createWallet: () => void,
  +importWallet: () => void,
|}

class WalletsStartView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      goToTerms,
      createWallet,
      importWallet,
    }: Props = this.props

    return (
      <div className='wallets-start-view'>
        <WalletHeader />
        <div className='content'>
          <div className='title'>
            <JText size='title' value='Create a new key pair or import an existing' />
            <JText size='title' value='one to get started' />
          </div>
          <div className='buttons'>
            <NewWalletButtons
              createWallet={createWallet}
              importWallet={importWallet}
            />
          </div>
        </div>
        <div className='terms'>
          <JText value='By clicking "Create new" or "Import" I agree to Jibrel’s' />
          <div className='link'>
            <JFlatButton onClick={goToTerms} label='Terms of Service' isUnderscored />
          </div>
        </div>
      </div>
    )
  }
}

export default WalletsStartView
