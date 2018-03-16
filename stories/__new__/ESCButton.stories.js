
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import ESCButton from '../../src/components/__new__/ESCButton/ESCButton'

storiesOf('ESCButton', module)
  .add('Default', () => (
    <div style={{ backgroundColor: '#0050db' }} >
      <ESCButton />
    </div>
  ))
