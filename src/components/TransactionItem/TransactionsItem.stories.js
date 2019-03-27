// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import TransactionItem from 'components/TransactionItem'
import { ethereum } from 'data/assets'

storiesOf('TransactionItem')

  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <TransactionItem
        data={ethereum.symbol}
        asset={ethereum.address}
      />
    </div>
  ))
