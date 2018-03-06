
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import JButton from './JButton'

storiesOf('Button', module)
  .add('Big blue', () => (
    <JButton
      text='Button'
      size='big'
      color='blue'
    />
  ))
  .add('Big white', () => (
    <JButton
      text='Button'
      size='big'
      color='white'
    />
  ))
  .add('Small blue', () => (
    <JButton
      text='Button'
      size='small'
      color='blue'
    />
  ))
  .add('Small white', () => (
    <JButton
      text='Button'
      size='small'
      color='white'
    />
  ))
