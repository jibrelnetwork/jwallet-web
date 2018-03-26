// @flow

import React from 'react'

import { handle, isMnemonicType } from 'utils'
import { JText, JIcon, JButton } from 'components/base/__new__'

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
  const text = isMnemonic ? 'Mnemonic' : `${address.substr(0, 15)}...${address.substr(-6)}`

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
        <JButton
          iconName='dots-white'
          iconSize='medium'
          onClick={handle(showActionsMenu)(id)}
        />
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
