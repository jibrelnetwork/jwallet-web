// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../../src/components/base/JIcon'

storiesOf('JIcon')
  .add('Small', () => (
    <JIcon
      color='gray'
      size='small'
      name='close'
    />
  ))
  .add('Medium', () => (
    <JIcon
      color='gray'
      size='medium'
      name='logout'
    />
  ))
  .add('Large', () => (
    <JIcon
      size='large'
      color='gray'
      name='transaction-send'
    />
  ))
  .add('Custom color', () => (
    <div styles={{ display: 'flex' }}>
      <JIcon
        color='blue'
        size='small'
        name='arrow'
      />
      <JIcon
        color='sky'
        name='plus'
        size='small'
      />
    </div>
  ))
