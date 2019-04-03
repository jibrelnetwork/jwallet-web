// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JRadio from 'components/base/JRadio'

storiesOf('JRadio')
  .add('Default', () => (
    <div>
      <h2>Default</h2>
      <div className='story -blue'>
        <JRadio label='Test' />
      </div>
      <h2>Checked</h2>
      <div className='story -blue'>
        <JRadio label='Ttest 2' isChecked />
      </div>
    </div>
  ))
