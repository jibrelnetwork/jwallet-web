// @flow

import React from 'react'
import { JFlatButton } from 'react-components'

import ModalHeader from 'components/ModalHeader'

import MnemonicAddressesList from './MnemonicAddressesList'

const WalletsMnemonicAddressesView = ({
  goBack,
  getMore,
  setActive,
  addresses,
  isReadOnly,
}: Props) => (
  <div className='wallets-mnemonic-addresses-view'>
    <ModalHeader title='Mnemonic addresses' color='white' location='/wallets' />
    <div className='content'>
      <MnemonicAddressesList setActive={setActive} addresses={addresses} isReadOnly={isReadOnly} />
      <div className='actions'>
        <div className='back'>
          <JFlatButton
            onClick={goBack}
            label='Back'
            iconName='arrow'
            iconSize='small'
            iconColor='white'
            isTransparent
          />
        </div>
        <div className='forward'>
          <JFlatButton
            onClick={getMore}
            label='Get more'
            iconName='plus'
            iconSize='small'
            iconColor='white'
            isTransparent
          />
        </div>
      </div>
    </div>
  </div>
)

type Props = {
  goBack: Function,
  getMore: Function,
  setActive: Function,
  addresses: Addresses,
  isReadOnly: boolean,
}

export default WalletsMnemonicAddressesView
