/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Field,
} from 'react-final-form'

import { RecipientPicker } from './RecipientPicker'

import { prepareWallets } from './prepareWallets'

// +name?: string,
// +description?: string,
// +address: FavoriteAddress,
// +isAddedByUser?: boolean,

const CONTACT_ITEMS = [
  {
    name: 'Mr Credo 1',
    description: 'Singer',
    address: '0x312321312321312312341798432643783412',
  },
  {
    name: 'Mr Credo 2',
    description: 'Singer',
    address: '0x312321312321312312341798432643783413',
  },
  {
    name: 'Mr Credo 3',
    description: 'Singer',
    address: '0x312321312321312312341798432643783414',
  },
  {
    name: 'Mr Credo 4',
    address: '0x312321312321312312341798432643783415',
  },
  {
    address: '0x312321312321312312341798432643783416',
  },
  {
    name: 'Mr Credo 5',
    description: 'Singer',
    address: '0x312321312321312312341798432643783417',
  },
]

const WALLET_ITEMS = [
  {
    id: '1',
    name: 'My single wallet 1',
    type: 'address',
    address: '0x312321312321312312341798432643783419',
    isReadOnly: true,
    isSimplified: true,
    bip32XPublicKey: null,
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
    name: 'My single wallet 2',
    type: 'address',
    // eslint-disable-next-line max-len
    bip32XPublicKey: 'xpub6BVyo8p6jgRS5KPzMaJabfD5r4eJY5xpa4uDYU7ohu5eCUfYxyrtAFRJyqsmB85LGerYVDJ6stjXgsDWRUda2EJoLJJ32wHoTuFYduEcave',
    isReadOnly: false,
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
    name: 'My mnemonic wallet 3',
    type: 'mnemonic',
    isReadOnly: false,
    isSimplified: false,
    // eslint-disable-next-line max-len
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
    address: '0x312321312321312312341798432643783421',
    isReadOnly: true,
    isSimplified: true,
    bip32XPublicKey: null,
    //   +bip32XPublicKey: ?string,
    //   +customType: WalletCustomType,
    //   +orderIndex: number,
    //   +addressIndex: ?number,
    //   +network: null | number | string,
    //   +isReadOnly: boolean,
    //   +isSimplified: ?boolean,
  },
]

const WALLET_BALANCES = {
  '0x312321312321312312341798432643783419': '$1.00',
  '0x9b20009CfC19601B53491a35a647D56106c89555': '$5000.00',
  '0x312321312321312312341798432643783412': '$200.00',
}

const NAMED_ADDRESSES = {
  '0x312321312321312312341798432643783420': 'Some named adress',
  '0x9b20009CfC19601B53491a35a647D56106c89555': 'My *** address',
}

console.log(CONTACT_ITEMS)
console.log(WALLET_ITEMS)
console.log(WALLET_BALANCES)
console.log(NAMED_ADDRESSES)

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

const preparedWallets = prepareWallets(WALLET_ITEMS, WALLET_BALANCES, NAMED_ADDRESSES)
console.log(preparedWallets)

storiesOf('send|RecipientPicker', module)
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(RecipientPicker, {
        contacts: CONTACT_ITEMS,
        wallets: preparedWallets,
      }, { foo: '' })}
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
