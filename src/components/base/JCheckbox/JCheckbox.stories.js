// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'

import { JCheckbox } from '..'

const handleChange = console.log

storiesOf('JCheckbox', module)
  .add('Default', () => (
    <div>
      <h2>Default</h2>
      <div className='story'>
        <JCheckbox
          onChange={handleChange}
          name='test'
        >
          Test
        </JCheckbox>
      </div>
      <h2>Checked</h2>
      <div className='story'>
        <JCheckbox
          onChange={handleChange}
          name='test2'
          isChecked
        >
          Ttest 2
        </JCheckbox>
      </div>
    </div>
  ))
