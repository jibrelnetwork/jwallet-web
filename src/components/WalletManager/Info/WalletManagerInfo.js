// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import isMnemonicType from 'utils/keystore/isMnemonicType'
import { JFlatButton, JIcon, JText } from 'components/base'

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
    <div className='wallet-manager-info'>
      <div onClick={handle(toggleWallet)(id)} className='content'>
        <div className='icon'>
          <JIcon name={icon} size='medium' transparent />
        </div>
        <div className='data'>
          <div className='title'>
            <JText value={name} size='large' weight='bold' />
          </div>
          <div className='text'>
            <JText value={isReadOnly ? `${text}, read only` : text} />
          </div>
        </div>
      </div>
      <div className='actions'>
        <div className='button'>
          <JFlatButton
            onClick={handle(showActionsMenu)(id)}
            iconName='dots'
            iconSize='medium'
            transparent
          />
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

WalletManagerInfo.defaultProps = {
  toggleWallet: () => {},
  showActionsMenu: () => {},
  walletData: {},
  icon: '',
}

export default WalletManagerInfo
