// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JLoader from './JLoader'

storiesOf('JLoader')
  .add('Different colors', () => (
    <div>
      <h2>blue</h2>
      <div style={{ padding: '20px' }}>
        <JLoader color='blue' />
      </div>
      <h2>gray</h2>
      <div style={{ padding: '20px' }}>
        <JLoader color='gray' />
      </div>
      <h2>white</h2>
      <div style={{
        padding: '20px',
        backgroundColor: '#666',
      }}
      >
        <JLoader color='white' />
      </div>
    </div>
  ))
