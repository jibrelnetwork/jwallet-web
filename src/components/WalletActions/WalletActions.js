// @flow

import React from 'react'

import JFlatButton from 'components/base/JFlatButton'

type Props = {|
  +renameWallet: () => void,
  +deleteWallet: () => void,
|}

const WalletActions = ({
  renameWallet,
  deleteWallet,
}: Props) => (
  <div className='wallet-actions'>
    <JFlatButton
      onClick={renameWallet}
      label='Rename'
      color='white'
      isHoverOpacity
    />
    <JFlatButton
      onClick={console.log}
      label='Backup'
      color='white'
      isHoverOpacity
    />
    <JFlatButton
      onClick={deleteWallet}
      label='Delete'
      color='white'
      isHoverOpacity
    />
  </div>
)

export default WalletActions
