// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  text,
  select,
  withKnobs,
} from '@storybook/addon-knobs'

import JFieldMessage from './JFieldMessage'

storiesOf('base|JFieldMessage', module)
  .addDecorator(withKnobs)
  .add('Error and info messages', () => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        background: '#e5e5e5',
      }}
    >
      <div style={{ padding: '20px' }}>
        <JFieldMessage
          message={text('Message', 'Hello, world!')}
          theme={select('Theme', ['error', 'info'])}
        />
      </div>
    </div>
  ))
