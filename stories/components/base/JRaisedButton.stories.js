
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

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
  .add('Different status', () => (
    <div>
      <div style={getBackground('#ffffff')}>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
          >Yes, delete
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            disabled
          >Yes, delete
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            isLoading
          >Yes, delete
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
          >Yes, delete
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='white'
            disabled
          >Yes, delete
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='white'
            isLoading
          >Yes, delete
          </JRaisedButton>
        </div>
      </div>
      <h2>Dark</h2>
      <div style={getBackground('#232d3e')}>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='gray'
          >Yes, delete
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='gray'
            disabled
          >Yes, delete
          </JRaisedButton>
        </div>
        <div style={componentCard} >
          <JRaisedButton
            onClick={action('onClick')}
            theme='gray'
            isLoading
          >Yes, delete
          </JRaisedButton>
        </div>
      </div>
    </div>
  ))
