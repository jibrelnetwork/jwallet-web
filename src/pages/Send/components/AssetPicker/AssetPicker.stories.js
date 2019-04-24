/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Field,
} from 'react-final-form'

import { AssetPicker } from './AssetPicker'

const ASSETS = [{
  name: 'First',
  symbol: '1st',
  balance: {
    value: '800000000000000000000000',
    fiatBalance: 100,
  },
  isActive: true,
  isCustom: false,
  blockchainParams: {
    address: '0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7',
    decimals: 18,
    deploymentBlockNumber: 4145415,
    staticGasAmount: 52106,
    type: 'erc-20',
  },
}, {
  name: 'AdEx',
  symbol: 'ADX',
  balance: {
    value: '20000000000',
  },
  isActive: true,
  isCustom: false,
  blockchainParams: {
    address: '0x4470BB87d77b963A013DB939BE332f927f2b992e',
    decimals: 4,
    deploymentBlockNumber: 4145415,
    staticGasAmount: 52106,
    type: 'erc-20',
  },
}, {
  name: 'adToken',
  symbol: 'ADT',
  balance: null,
  isActive: true,
  isCustom: false,
  blockchainParams: {
    address: '0xD0D6D6C5Fe4a677D343cC433536BB717bAe167dD',
    decimals: 9,
    deploymentBlockNumber: 4145415,
    staticGasAmount: 52106,
    type: 'erc-20',
  },
}, {
  name: 'AdShares',
  symbol: 'ADST',
  balance: null,
  isActive: true,
  isCustom: false,
  blockchainParams: {
    address: '0x422866a8F0b032c5cf1DfBDEf31A20F4509562b0',
    decimals: 0,
    deploymentBlockNumber: 4145415,
    staticGasAmount: 52106,
    type: 'erc-20',
  },
}, {
  name: '0x',
  symbol: 'ZRX',
  balance: null,
  isActive: true,
  isCustom: false,
  blockchainParams: {
    address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
    decimals: 18,
    deploymentBlockNumber: 4145415,
    staticGasAmount: 52106,
    type: 'erc-20',
  },
}, {
  name: 'Ethereum',
  symbol: 'ETH',
  balance: {
    value: '320000000000000000000',
    fiatBalance: 99,
  },
  isActive: true,
  isCustom: false,
  blockchainParams: {
    address: 'Ethereum',
    decimals: 18,
    deploymentBlockNumber: 4145415,
    staticGasAmount: 52106,
    type: 'ethereum',
  },
}]

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

storiesOf('send|AssetPicker', module)
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(AssetPicker, {
        label: 'Asset Picker',
        digitalAssets: ASSETS,
      }, { foo: 'Ethereum' })}
    </div>
  ))
