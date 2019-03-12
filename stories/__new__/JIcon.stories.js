
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../src/components/base/JIcon'

storiesOf('JIcon', module)
  .add('Small close', () => (
    <JIcon
      name='close'
    />
  ))
  .add('Medium logout', () => (
    <JIcon
      name='logout'
    />
  ))
  .add('Large Ant token', () => (
    <JIcon
      name='token-ant'
    />
  ))
  .add('Extra large received transaction', () => (
    <JIcon
      name='transaction-receive'
    />
  ))
