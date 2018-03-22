
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import WalletHeader from '../../src/components/__new__/WalletHeader'

storiesOf('WalletHeader', module)
  .add('Default', () => (
    <div style={{ backgroundColor: '#0050db' }} >
      <WalletHeader />
    </div>
  ))
