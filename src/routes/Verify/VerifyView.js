// @flow

import React from 'react'

import CloseableScreen from 'components/CloseableScreen'

import './verifyView.scss'

type Props = {|
  +onClose: Function,
  +isReadOnly: boolean,
  +isMnemonic: boolean,
|}

function VerifyView({ onClose, isReadOnly, isMnemonic }: Props) {
  const title = isMnemonic ? 'Add private key' : 'Add mnemonic'

  if (!isReadOnly) {
    // FIXME: need proper redirect to /wallets here
    return (
      <h1>Error</h1>
    )
  }

  return (
    <CloseableScreen
      close={onClose}
      title={title}
    >
      <div className='verify-view' />
    </CloseableScreen>
  )
}

export default VerifyView
