/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Field,
} from 'react-final-form'

import { RecipientPicker } from './RecipientPicker'

// +name?: string,
// +description?: string,
// +address: FavoriteAddress,
// +isAddedByUser?: boolean,

const CONTACT_ITEMS = [
  {
    name: 'Mr Credo',
    description: 'Singer',
    address: '0x312321312321312312341798432643783412',
  },
  {
    name: 'Mr Credo',
    description: 'Singer',
    address: '0x312321312321312312341798432643783413',
  },
  {
    name: 'Mr Credo',
    description: 'Singer',
    address: '0x312321312321312312341798432643783414',
  },
  {
    name: 'Mr Credo',
    address: '0x312321312321312312341798432643783415',
  },
  {
    address: '0x312321312321312312341798432643783416',
  },
  {
    name: 'Mr Credo',
    description: 'Singer',
    address: '0x312321312321312312341798432643783417',
  },
]

const WALLET_ITEMS = [
  {
    id: '1',
    name: 'My single wallet',
    type: 'address',
    address: '0x312321312321312312341798432643783418',
    isReadOnly: true,
    isSimplified: true,
    //   +bip32XPublicKey: ?string,
    //   +customType: WalletCustomType,
    //   +orderIndex: number,
    //   +addressIndex: ?number,
    //   +network: null | number | string,
    //   +isReadOnly: boolean,
    //   +isSimplified: ?boolean,
  },
  {
    id: '2',
    name: 'My single wallet',
    type: 'address',
    address: '0x312321312321312312341798432643783418',
    isReadOnly: true,
    isSimplified: true,
    //   +bip32XPublicKey: ?string,
    //   +customType: WalletCustomType,
    //   +orderIndex: number,
    //   +addressIndex: ?number,
    //   +network: null | number | string,
    //   +isReadOnly: boolean,
    //   +isSimplified: ?boolean,
  },
  {
    id: '3',
    name: 'My mnemonic wallet',
    type: 'mnemonic',
    // address: '0x312321312321312312341798432643783418',
    isReadOnly: true,
    isSimplified: true,
    bip32XPublicKey: 'xpub6AHA9hZDN11k2ijHMeS5QqHx2KP9aMBRhTDqANMnwVtdyw2TDYRmF8PjpvwUFcL1Et8Hj59S3gTSMcUQ5gAqTz3Wd8EsMTmF3DChhqPQBnU',
    //   +customType: WalletCustomType,
    //   +orderIndex: number,
    addressIndex: 4,
    //   +network: null | number | string,
    //   +isReadOnly: boolean,
    //   +isSimplified: ?boolean,
  },
  {
    id: '4',
    name: 'My single wallet',
    type: 'address',
    address: '0x312321312321312312341798432643783418',
    isReadOnly: true,
    isSimplified: true,
    //   +bip32XPublicKey: ?string,
    //   +customType: WalletCustomType,
    //   +orderIndex: number,
    //   +addressIndex: ?number,
    //   +network: null | number | string,
    //   +isReadOnly: boolean,
    //   +isSimplified: ?boolean,
  },
]

function formStoryWrapper(component, extraProps = {}, initialValues = { }) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={values => alert(JSON.stringify(values, false, 4))}
      render={({
        form,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name='foo'
            component={component}
            {...extraProps}
          />
        </form>
      )}
    />
  )
}

storiesOf('send|RecipientPicker', module)
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(RecipientPicker, {
        wallets: [],
        contacts: CONTACT_ITEMS,
        wallets: WALLET_ITEMS,
      }, { foo: 'Ethereum' })}
    </div>
  ))
  .add('Empty', () => (
    <div className='story'>
      {formStoryWrapper(RecipientPicker, {
        wallets: [],
        contacts: [],
      })}
    </div>
  ))
