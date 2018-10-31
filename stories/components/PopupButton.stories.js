// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import PopupButton from 'components/PopupButton'

storiesOf('PopupButton')
  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <div className='inline'>
        <PopupButton
          icon='filter'
        />
      </div>
    </div>
  ))
  .add('With informer', () => (
    <div className='story'>
      <h2>With informer</h2>
      <div className='inline'>
        <PopupButton
          icon='filter-selected'
          informer={2}
        />
      </div>
    </div>
  ))
