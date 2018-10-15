// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import JFlatButton from 'components/base/JFlatButton'

type Props = {|
  +setWalletAction: Function,
|}

const WalletActions = ({ setWalletAction }: Props) => (
  <div className='wallet-actions'>
    <JFlatButton
      onClick={handle(setWalletAction)('rename')}
      label='Rename'
      isHoverOpacity
      color='white'
    />
    <JFlatButton
      onClick={handle(setWalletAction)('backup')}
      label='Backup'
      isHoverOpacity
      color='white'
    />
    <JFlatButton
      onClick={handle(setWalletAction)('delete')}
      label='Delete'
      isHoverOpacity
      color='white'
    />
  </div>
)

export default WalletActions
