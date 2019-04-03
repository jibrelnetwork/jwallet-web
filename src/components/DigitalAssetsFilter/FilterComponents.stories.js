// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  DigitalAssetsFilter,
  TransactionsFilter,
} from 'components'

storiesOf('FilterComponents')
  .add('DigitalAssetsFilter', () => (
    <div className='story'>
      <h2>DigitalAssetsFilter</h2>
      <div className='right-position-content'>
        <DigitalAssetsFilter />
      </div>
    </div>
  ))
  .add('TransactionsFilter', () => (
    <div className='story'>
      <h2>TransactionsFilter</h2>
      <div className='right-position-content'>
        <TransactionsFilter />
      </div>
    </div>
  ))

