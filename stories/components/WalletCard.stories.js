// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import WalletCard from 'components/WalletCard'
import NewWalletButtons from 'components/NewWalletButtons'

const walletData = [
  {
    id: '1',
    name: 'Address isReadOnly',
    type: 'address',
    address: '0x',
    customType: 'address',
    isReadOnly: true,
  },
  {
    id: '2',
    name: 'Address',
    type: 'address',
    address: '0x',
    customType: 'address',
    isReadOnly: false,
  },
  {
    id: '3',
    name: 'Mnemonic',
    type: 'mnemonic',
    address: '0x',
    customType: 'mnemonic',
    isReadOnly: true,
  },
  {
    id: '4',
    name: 'Mnemonic',
    type: 'mnemonic',
    address: '0x',
    customType: 'mnemonic',
    isReadOnly: false,
  },
]

const props = [
  {
    toggledWalletId: '0',
    showActionsWalletId: '0',
  },
  {
    toggledWalletId: '1',
    showActionsWalletId: '1',
  },
  {
    toggledWalletId: '0',
    showActionsWalletId: '0',
    isLoading: true,
  },
]

storiesOf('WalletCard')

  .add('WalletFace', () => (
    <div>
      <h2>WalletFace</h2>
      {walletData.map(item => (
        <div key={item.id}>
          <WalletCard walletData={item} {...props[0]} />
        </div>
      ))}
    </div>
  ))
  .add('WalletActions', () => (
    <div>
      <h2>WalletActions</h2>
      <div>
        <WalletCard walletData={walletData[0]} {...props[1]} />
      </div>
    </div>
  ))
  .add('WalletLoading', () => (
    <div>
      <h2>WalletLoading</h2>
      <div>
        <WalletCard walletData={walletData[0]} {...props[2]} />
      </div>
    </div>
  ))
  .add('NewWalletButtons', () => (
    <div>
      <h2>NewWalletButtons</h2>
      <div className='story -blue'>
        <NewWalletButtons
          createWallet={props.createWallet}
          importWallet={props.importWallet}
        />
      </div>
    </div>
  ))
