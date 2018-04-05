// @flow

import React from 'react'

import JButton from 'components/base/JButton'
import handle from 'utils/eventHandlers/handle'

const WalletManagerActions = ({
  setWalletAction,
  isReadOnly,
}: Props) => (
  <div className='actions'>
    <div className='edit'>
      <JButton
        onClick={handle(setWalletAction)('edit')}
        text='Edit'
        color='white'
        minimal
      />
    </div>
    <div className='backup'>
      <JButton
        onClick={handle(setWalletAction)('backup')}
        text='Backup'
        color='white'
        minimal
      />
    </div>
    {!isReadOnly && (
      <div className='change-password'>
        <JButton
          onClick={handle(setWalletAction)('change-password')}
          text='Change password'
          color='white'
          minimal
        />
      </div>
    )}
    <div className='delete'>
      <JButton
        onClick={handle(setWalletAction)('remove')}
        text='Delete'
        color='white'
        minimal
      />
    </div>
  </div>
)

type Props = {
  setWalletAction: (walletAction: WalletAction) => Dispatch,
  isReadOnly: boolean,
}

export default WalletManagerActions
