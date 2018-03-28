// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import handle from 'utils/handle'
import JButton from 'components/base/__new__/JButton'
import { DerivedAddress, ModalHeader } from 'components/__new__'

const MnemonicAddresses = ({
  setActive,
  goBack,
  getMore,
  addresses,
  balances,
}: Props) => (
  <div className='content'>
    <div className='modal-header-wrapper'>
      <ModalHeader title='Mnemonic addresses' color='white' />
    </div>
    <div className='form'>
      <div className='addresses-list'>
        <Scrollbars autoHide>
          {addresses.map((address, index) => (
            <DerivedAddress
              key={index}
              onClick={handle(setActive)(index)}
              address={address}
              balance={balances[address]}
              index={index}
            />
          ))}
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
