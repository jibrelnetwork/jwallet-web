// @flow

import React from 'react'

import handle from 'utils/handle'

const WalletActions = ({
  setWalletAction,
  isReadOnly,
}: Props) => (
  <div className='wallet-actions' style={{ display: 'flex' }}>
    <div
      onClick={handle(setWalletAction)('edit')}
      style={{ marginRight: '20px' }}
    >
      {'Edit'}
    </div>
    <div
      onClick={handle(setWalletAction)('backup')}
      style={{ marginRight: '20px' }}
    >
      {'Backup'}
    </div>
    {!isReadOnly && (
      <div
        onClick={handle(setWalletAction)('edit')}
        style={{ marginRight: '20px' }}
      >
        {'Change password'}
      </div>
    )}
    <div
      onClick={handle(setWalletAction)('remove')}
      style={{ marginRight: '20px', opacity: '0.5' }}
    >
      {'Delete'}
    </div>
  </div>
)

type Props = {
  setWalletAction: (walletAction: WalletAction) => Dispatch,
  isReadOnly: boolean,
}

export default WalletActions
