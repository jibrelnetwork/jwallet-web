
/* @flow */

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import JRaisedButton from '../../../src/components/base/JRaisedButton'

storiesOf('JRaisedButton', module)
  .add('Different status', () => (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', background: '#fff' }}>
        <div style={{ padding: '10px', width: '140px' }} >
          <JRaisedButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
          />
        </div>
        <div style={{ padding: '10px', width: '140px' }} >
          <JRaisedButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
            isDisabled
          />
        </div>
        <div style={{ padding: '10px', width: '140px' }} >
          <JRaisedButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
            isLoading
          />
        </div>
      </div>
    </div>
  ))
  .add('Different color', () => (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', background: '#0033A3' }}>
        <div style={{ padding: '10px', width: '140px' }} >
          <JRaisedButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='white'
            labelColor='blue'
            loaderColor='blue'
          />
        </div>
        <div style={{ padding: '10px', width: '140px' }} >
          <JRaisedButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='white'
            labelColor='white'
            loaderColor='white'
            isDisabled
          />
        </div>
        <div style={{ padding: '10px', width: '140px' }} >
          <JRaisedButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='white'
            labelColor='white'
            loaderColor='white'
            isLoading
          />
        </div>
      </div>
    </div>
  ))
