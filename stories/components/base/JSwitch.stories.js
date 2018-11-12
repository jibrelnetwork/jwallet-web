// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { JSwitch } from 'components/base'

storiesOf('JSwitch')
  .add('Default', () => (
    <div className='story'>
      <h2>Default unchecked</h2>
      <JSwitch name='Test' />
      <h2>Default checked</h2>
      <JSwitch name='Test-2' isChecked />
    </div>
  ))
