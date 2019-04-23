// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  text,
  select,
  withKnobs,
} from '@storybook/addon-knobs'

import { ADDRESSES_AVAILABLE } from './symbolsAvailable'
import { JAssetSymbol } from './JAssetSymbol'

const ADDRESSES_LIST = Object.keys(ADDRESSES_AVAILABLE)

const AVAILABLE_COLORS = [
  'blue',
  'white',
  'gray',
]
const AVAILABLE_SIZES = [
  24,
  32,
]
const ADDRESS_SELECT = {
  'Ethereum': 'ethereum',
  'Nothing': null,
}

const toLowerCaseSafe = s => (s && typeof s === 'string') ?
  s.toLowerCase() :
  s

storiesOf('JAssetSymbol', module).addDecorator(withKnobs)
  .add('Customizable', () => (
    <div>
      <h2 className='title'>Customizable example</h2>
      <div className='icon-demo-container'>
        <JAssetSymbol
          symbol={text('Symbol', 'WWWW')}
          address={select('Address', ADDRESS_SELECT, null)}
          color={select('Color', AVAILABLE_COLORS, 'blue')}
          size={select('Size', AVAILABLE_SIZES, 24)}
        />
      </div>
    </div>
  ))
  .add('Type your address', () => (
    <div>
      <h2 className='title'>Type address into the knob</h2>
      <div className='icon-demo-container'>
        <JAssetSymbol
          symbol='NONE'
          address={toLowerCaseSafe(text('Address', null))}
          color='blue'
          size={32}
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
              symbol={ADDRESSES_AVAILABLE[address]}
              size={32}
              address={address}
              className='image'
            />
            <span className='symbol'>{ADDRESSES_AVAILABLE[address]}</span>
            <span className='address'>{address}</span>
          </li>
        ))}
      </ul>
    </div>
  ))
