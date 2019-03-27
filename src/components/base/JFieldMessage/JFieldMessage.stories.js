
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
} from '@storybook/addon-knobs'

import { JFieldMessage } from './JFieldMessage'

const getBackground = background => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  background,
})

const componentCard = {
  padding: '20px',
  width: '200px',
}

storiesOf('JFieldMessage', module)
  .addDecorator(withKnobs)
  .add('Error and info messages', () => (
    <div>
      <div style={getBackground('#ffffff')}>
        <div style={componentCard} >
          <JFieldMessage message={text('message', 'Hello, world!')} theme='error' />
        </div>
        <div style={componentCard} >
          <JFieldMessage message={text('message', 'Hello, world!')} theme='info' />
        </div>
      </div>
    </div>
  ))
