// @flow

import React from 'react'

import handle from 'utils/handle'

const WalletFace = ({
  toggleWallet,
  showActionsMenu,
  walletData: {
    id,
    name,
    type,
    isReadOnly,
  },
}: Props) => (
  <div className='wallet-face' style={{ marginBottom: '20px' }}>
    <div onClick={handle(toggleWallet)(id)}>{id}</div>
    <div>{name}</div>
    <div>{type}</div>
    <div onClick={handle(showActionsMenu)(id)}>{isReadOnly ? 'ReadOnly' : 'Full Access'}</div>
  </div>
)

type Props = {
  toggleWallet: (walletId: WalletId) => Dispatch,
  showActionsMenu: (walletId: WalletId) => Dispatch,
  walletData: Wallet,
}

export default WalletFace
