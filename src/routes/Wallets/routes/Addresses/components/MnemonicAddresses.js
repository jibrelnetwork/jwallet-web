// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import JButton from 'components/base/JButton'
import ModalHeader from 'components/ModalHeader'

import MnemonicAddressesList from './MnemonicAddressesList'

const MnemonicAddresses = ({
  setActive,
  goBack,
  getMore,
  addresses,
  balances,
}: Props) => (
  <div className='mnemonic-addresses-view'>
    <div className='header'>
      <ModalHeader title='Mnemonic addresses' color='white' />
    </div>
    <div className='list'>
      <Scrollbars autoHide>
        <MnemonicAddressesList
          setActive={setActive}
          addresses={addresses}
          balances={balances}
        />
      </Scrollbars>
    </div>
    <div className='actions'>
      <JButton
        onClick={goBack}
        text='Back'
        color='white'
        iconSize='small'
        iconName='arrow-back'
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
)

type Props = {
  setActive: (addressIndex: Index) => Dispatch,
  goBack: () => Dispatch,
  getMore: () => Dispatch,
  addresses: Addresses,
  balances: Balances,
}

export default MnemonicAddresses
