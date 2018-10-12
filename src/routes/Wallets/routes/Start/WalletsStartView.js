// @flow

import React, { Component } from 'react'

import JText from 'components/base/JText'
import WalletHeader from 'components/WalletHeader'

import NewWalletButtons from '../../components/NewWalletButtons'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
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
      createWallet,
      importWallet,
    }: Props = this.props

    return (
      <div className='wallets-start-view'>
        <WalletHeader />
        <div className='content'>
          <div className='title'>
            <JText
              size='title'
              value='Create a new key pair or import an existing one to get started'
            />
          </div>
          <div className='buttons'>
            <NewWalletButtons
              createWallet={createWallet}
              importWallet={importWallet}
            />
          </div>
          <div className='terms'>
            <JText
              value='By clicking "Create new" or "Import" I agree to Jibrel’s Terms of Service'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default WalletsStartView
