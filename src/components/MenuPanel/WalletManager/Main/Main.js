// @flow

import React from 'react'
import classNames from 'classnames'

import checkMnemonicType from 'utils/wallets/checkMnemonicType'

import { JIcon, JText } from 'components/base'
import getShortenedAddress from 'utils/wallets/getShortenedAddress'

type Props = {|
  +toggle: () => void,
  +type: WalletType,
  +name: string,
  +address: string,
  +isActive: boolean,
  +isReadOnly: boolean,
|}

const SYMBOLS_FROM_START = 8
const SYMBOLS_FROM_END = 6

function MenuPanelWalletManagerMain({
  toggle,
  type,
  name,
  address,
  isActive,
  isReadOnly,
}: Props) {
  const isMnemonic: boolean = checkMnemonicType(type)

  return (
    <div
      onClick={toggle}
      className={classNames(
        'menu-panel-wallet-manager-main',
        isActive && '-active',
        isReadOnly && '-read-only'
      )}
    >
      <div className='icon'>
        <JIcon
          name={isMnemonic ? 'multy' : 'binding'}
          size='medium'
          color='white'
        />
      </div>
      <div className='info'>
        <div className='name'>
          <JText
            value={name}
            size='normal'
            color='white'
            weight='bold'
          />
        </div>
        <div className='address'>
          <JText
            value={getShortenedAddress(address, SYMBOLS_FROM_START, SYMBOLS_FROM_END)}
            color='white'
            size='small'
          />
        </div>
      </div>
      <div className='chevron'>
        <JIcon
          name='chevron-down'
          size='medium'
          color='white'
        />
      </div>
    </div>
  )
}

export default MenuPanelWalletManagerMain
