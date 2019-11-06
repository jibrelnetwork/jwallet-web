// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  text,
  select,
  withKnobs,
} from '@storybook/addon-knobs'

import JAssetSymbol from './JAssetSymbol'
import { ADDRESSES_AVAILABLE } from './symbolsAvailable'

const ADDRESSES_LIST = Object.keys(ADDRESSES_AVAILABLE)

const AVAILABLE_SIZES = [
  24,
  32,
]

const ADDRESS_SELECT = {
  'Ethereum': 'ethereum',
  'Nothing': null,
}

const toLowerCaseSafe = s => (s && typeof s === 'string') ? s.toLowerCase() : s

storiesOf('JAssetSymbol', module).addDecorator(withKnobs)
  .add('Customizable', () => (
    <div>
      <h2 className='title'>Customizable example</h2>
      <div className='icon-demo-container'>
        <JAssetSymbol
          symbol={text('Symbol', 'WWWW')}
          size={select('Size', AVAILABLE_SIZES, 24)}
          address={select('Address', ADDRESS_SELECT, null)}
        />
      </div>
    </div>
  ))
  .add('Type your address', () => (
    <div>
      <h2 className='title'>Type address into the knob</h2>
      <div className='icon-demo-container'>
        <JAssetSymbol
          size={32}
          symbol='NONE'
          address={toLowerCaseSafe(text('Address', null))}
        />
      </div>
    </div>
  ))
  .add('List of all available symbols', () => (
    <div>
      <ul className='symbols-list'>
        {ADDRESSES_LIST.map(address => (
          <li key={address}>
            <JAssetSymbol
              size={32}
              address={address}
              className='image'
              symbol={ADDRESSES_AVAILABLE[address]}
            />
            <span className='symbol'>{ADDRESSES_AVAILABLE[address]}</span>
            <span className='address'>{address}</span>
          </li>
        ))}
      </ul>
    </div>
  ))
