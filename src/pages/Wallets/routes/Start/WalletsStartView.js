// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import JText from 'components/base/JText'

import {
  WalletHeader,
  NewWalletButtons,
} from 'components'

type Props = {|
  +openView: Function,
  +closeView: Function,
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
            <JText size='title' value={t`Create a new key pair or import an existing`} />
            <JText size='title' value={t`one to get started`} />
          </div>
          <div className='buttons'>
            <NewWalletButtons
              createWallet={createWallet}
              importWallet={importWallet}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default WalletsStartView
