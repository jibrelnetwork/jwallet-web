
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../src/components/base/__new__/JIcon'

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
      name='token-ant'
    />
  ))
  .add('Extra large received transaction', () => (
    <JIcon
      size='extra-large'
      name='transaction-receive'
    />
  ))
