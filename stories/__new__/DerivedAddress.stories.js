
/* @flow */

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import DerivedAddress from '../../src/components/__new__/DerivedAddress'

storiesOf('DerivedAddress', module)
  .add('Default', () => (
    <div style={{ padding: 15, backgroundColor: '#0050db' }} >
      <DerivedAddress
        address='0x6db472d2f86cba8cac6c0f4e03dce4f89b061af0'
        balance='10'
        onClick={action('onClick')}
      />
    </div>
  ))
