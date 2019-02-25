// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import { JCard, JText } from '../../../src/components/base'

storiesOf('JCard')
  .add('Different colors', () => (
    <div>
      <h2>blue</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        backgroundImage: 'linear-gradient(to bottom right, #003dc6, #0058d2)',
      }}
      >
        <JCard color='blue'>
          <div style={{ padding: '40px' }}>
            <JText value='Lorem ipsum dolor sit amet' color='white' />
          </div>
        </JCard>
      </div>
      <h2>white</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        backgroundColor: '#f5f6fa',
      }}
      >
        <JCard color='white'>
          <div style={{ padding: '40px' }}>
            <JText value='Lorem ipsum dolor sit amet' color='gray' />
          </div>
        </JCard>
      </div>
    </div>
  ))
