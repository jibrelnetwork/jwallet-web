// @flow

import React from 'react'
import { JFlatButton } from 'react-components'

import handle from 'utils/eventHandlers/handle'

const WalletActions = ({ setWalletAction, isReadOnly }: Props) => (
  <div className='wallet-actions'>
    <JFlatButton onClick={handle(setWalletAction)('edit')} label='Edit' color='white' />
    <JFlatButton onClick={handle(setWalletAction)('backup')} label='Backup' color='white' />
    {!isReadOnly && (
      <JFlatButton
        onClick={handle(setWalletAction)('change-password')}
        color='white'
        label='Change password'
      />
    )}
    <JFlatButton onClick={handle(setWalletAction)('remove')} label='Delete' color='white' />
  </div>
)

type Props = {
  setWalletAction: Function,
  isReadOnly: boolean,
}

export default WalletActions
