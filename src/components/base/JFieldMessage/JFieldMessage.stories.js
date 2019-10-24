
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  select,
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
}

storiesOf('JFieldMessage', module)
  .addDecorator(withKnobs)
  .add('Error and info messages', () => (
    <div>
      <div style={getBackground('#e5e5e5')}>
        <div style={componentCard} >
          <JFieldMessage
            message={text('Message', 'Hello, world!')}
            theme={select('Theme', ['error', 'info'])}
          />
        </div>
      </div>
    </div>
  ))
