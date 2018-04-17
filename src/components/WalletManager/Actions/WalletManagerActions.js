// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import JFlatButton from 'components/base/JFlatButton'

const WalletManagerActions = ({ setWalletAction, isReadOnly }: Props) => (
  <div className='wallet-manager-actions'>
    <JFlatButton onClick={handle(setWalletAction)('edit')} text='Edit' />
    <JFlatButton onClick={handle(setWalletAction)('backup')} text='Backup' />
    {!isReadOnly && (
      <JFlatButton onClick={handle(setWalletAction)('change-password')} text='Change password' />
    )}
    <JFlatButton onClick={handle(setWalletAction)('remove')} text='Delete' />
  </div>
)

type Props = {
  setWalletAction: (walletAction: WalletAction) => Dispatch,
  isReadOnly: boolean,
}

WalletManagerActions.defaultProps = {
  setWalletAction: () => {},
  isReadOnly: false,
}

export default WalletManagerActions
