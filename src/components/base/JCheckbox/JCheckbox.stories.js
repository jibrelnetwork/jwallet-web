// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JCheckbox from './JCheckbox'

storiesOf('JCheckbox')
  .add('Default', () => (
    <div>
      <h2>Default</h2>
      <div className='story'>
        <JCheckbox label='Test' />
      </div>
      <h2>Checked</h2>
      <div className='story'>
        <JCheckbox label='Ttest 2' isChecked />
      </div>
    </div>
  ))
