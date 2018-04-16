// @flow

import React from 'react'

import ModalHeader from 'components/ModalHeader'
import JFlatButton from 'components/base/JFlatButton'

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
        <div className='back'>
          <JFlatButton onClick={goBack} text='Back' iconName='arrow' transparent />
        </div>
        <div className='forward'>
          <JFlatButton onClick={getMore} text='Get more' iconName='plus' transparent />
        </div>
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
