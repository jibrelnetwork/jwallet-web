
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from './JIcon'

storiesOf('JIcon', module)
  .add('Small close', () => (
    <JIcon
      size='small'
      name='close'
    />
  ))
  .add('Medium logout', () => (
    <JIcon
      size='medium'
      name='logout'
    />
  ))
  .add('Large Ant token', () => (
    <JIcon
      size='large'
      name='ant-token'
    />
  ))
  .add('Extra large received transaction', () => (
    <JIcon
      size='extra-large'
      name='transaction-receive'
    />
  ))
