// @flow

import React, { Component } from 'react'

import { JText } from 'components/base'
import { WalletHeader, NewWalletButtons } from 'components'

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
      <div className='wallets-view -start'>
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
          <JText value='By clicking "Create new" or "Import" I agree to' />
          <a
            className='j-text -white -nowrap -underline link'
            href='https://jwallet.network/docs/JibrelAG-TermsofUse.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            Terms of Use
          </a>
          <JText value='and' />
          <a
            className='j-text -white -nowrap -underline link'
            href='https://jwallet.network/docs/JibrelAG-PrivacyPolicy.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            Privacy Policy
          </a>
        </div>
      </div>
    )
  }
}

export default WalletsStartView
