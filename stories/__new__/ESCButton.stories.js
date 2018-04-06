
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import ESCButton from '../../src/components/ESCButton'

storiesOf('ESCButton', module)
  .add('White', () => (
    <div style={{ backgroundColor: '#0050db' }} >
      <ESCButton color='white' />
    </div>
  ))
  .add('Gray', () => (
    <div>
      <ESCButton color='gray' />
    </div>
  ))
