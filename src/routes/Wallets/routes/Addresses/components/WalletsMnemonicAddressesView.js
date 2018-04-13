// @flow

import React from 'react'

import JButton from 'components/base/JButton'
import ModalHeader from 'components/ModalHeader'

import MnemonicAddressesList from './MnemonicAddressesList'

const WalletsMnemonicAddressesView = ({
  setActive,
  goBack,
  getMore,
  addresses,
  balances,
}: Props) => (
  <div className='wallets-mnemonic-addresses-view'>
    <ModalHeader title='Mnemonic addresses' color='white' location='/wallets' />
    <div className='content'>
      <MnemonicAddressesList setActive={setActive} addresses={addresses} balances={balances} />
      <div className='actions'>
        <JButton
          onClick={goBack}
          text='Back'
          color='white'
          iconSize='small'
          iconName='arrow'
          minimal
          transparent
        />
        <JButton
          onClick={getMore}
          color='white'
          text='Get more'
          iconSize='small'
          iconName='plus -white'
          right
          minimal
          transparent
        />
      </div>
    </div>
  </div>
)

type Props = {
  setActive: (addressIndex: Index) => Dispatch,
  goBack: () => Dispatch,
  getMore: () => Dispatch,
  addresses: Addresses,
  balances: Balances,
}

WalletsMnemonicAddressesView.defaultProps = {
  setActive: () => {},
  goBack: () => {},
  getMore: () => {},
  addresses: [],
  balances: {},
}

export default WalletsMnemonicAddressesView
