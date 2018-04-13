// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import isMnemonicType from 'utils/keystore/isMnemonicType'
import { JText, JIcon, JButton } from 'components/base'

const WalletManagerInfo = ({
  toggleWallet,
  showActionsMenu,
  walletData: {
    id,
    name,
    type,
    address,
    isReadOnly,
  },
  icon,
}: Props) => {
  const isMnemonic = isMnemonicType(type)

  const text = (!isMnemonic && address)
    ? `${address.substr(0, 15)}...${address.substr(-6)}`
    : 'Mnemonic'

  return (
    <div className='info'>
      <div onClick={handle(toggleWallet)(id)} className='content'>
        <div className='icon'>
          <JIcon name={icon} size='medium' />
        </div>
        <div className='data'>
          <div className='title'>
            <JText
              value={name}
              variants={['white', 'large', 'bold']}
            />
          </div>
          <div className='text'>
            <JText
              value={isReadOnly ? `${text}, read only` : text}
              variants={['white', 'normal', 'transparent']}
            />
          </div>
        </div>
      </div>
      <div className='actions'>
        <div className='button'>
          <JButton onClick={handle(showActionsMenu)(id)} iconName='dots' iconSize='medium' />
        </div>
      </div>
    </div>
  )
}

type Props = {
  toggleWallet: (walletId: WalletId) => Dispatch,
  showActionsMenu: (walletId: WalletId) => Dispatch,
  walletData: Wallet,
  icon: string,
}

export default WalletManagerInfo
