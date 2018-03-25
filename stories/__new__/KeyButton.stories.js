
/* @flow */

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import KeyButton from '../../src/components/__new__/KeyButton'

storiesOf('KeyButton', module)
  .add('Default', () => (
    <div style={{ padding: 25, backgroundColor: '#0050DB' }}>
      <KeyButton
        icon='private-key'
        text='0xceceaa8edc083...d55a32'
        title='Private Key'
        onClick={() => action('onClick')()}
      />
    </div>
  ))
