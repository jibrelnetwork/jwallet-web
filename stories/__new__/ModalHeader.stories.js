
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import ModalHeader from '../../src/components/ModalHeader'

storiesOf('ModalHeader', module)
  .add('White with steps', () => (
    <div style={{ backgroundColor: '#0050db' }} >
      <ModalHeader
        color='white'
        title='Some title'
        totalSteps={3}
        currentStep={1}
      />
    </div>
  ))
  .add('White without steps', () => (
    <div style={{ backgroundColor: '#0050db' }} >
      <ModalHeader
        color='white'
        title='Some title'
      />
    </div>
  ))
  .add('Gray with steps', () => (
    <div>
      <ModalHeader
        color='gray'
        title='Some title'
        totalSteps={3}
        currentStep={1}
      />
    </div>
  ))
  .add('Gray without steps', () => (
    <div>
      <ModalHeader
        color='gray'
        title='Some title'
      />
    </div>
  ))
