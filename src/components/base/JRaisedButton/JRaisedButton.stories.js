
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
} from '@storybook/addon-knobs'

import { JRaisedButton } from 'components/base'

const getBackground = background => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  background,
})

const componentCard = {
  padding: '10px',
  width: '140px',
}

storiesOf('JRaisedButton', module)
  .addDecorator(withKnobs)
  .add('Different status', () => (
    <div>
      <div style={getBackground('#ffffff')}>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            disabled
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            isLoading
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
      </div>
    </div>
  ))
  .add('Different color', () => (
    <div>
      <h2>White</h2>
      <div style={getBackground('#0033A3')}>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='white'
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='white'
            disabled
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='white'
            isLoading
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
      </div>
      <h2>Dark</h2>
      <div style={getBackground('#232d3e')}>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='gray'
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='gray'
            disabled
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='gray'
            isLoading
          >{text('Label', 'Yes, delete')}
          </JRaisedButton>
        </div>
      </div>
    </div>
  ))
