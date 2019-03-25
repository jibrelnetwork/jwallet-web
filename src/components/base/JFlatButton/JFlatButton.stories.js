/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import JFlatButton from './JFlatButton'

storiesOf('JFlatButton', module)
  .add('Different status', () => (
    <div>
      <h2>No icon</h2>
      <div style={{
        display: 'flex', flexDirection: 'row', width: '100%',
      }}
      >
        <div style={{
          padding: '10px', backgroundColor: '#0033A3', width: '140px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='white'
            isBordered
          />
        </div>
        <div style={{
          padding: '10px', backgroundColor: '#0033A3', width: '140px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='white'
            isDisabled
            isBordered
          />
        </div>
        <div style={{
          padding: '10px', backgroundColor: '#0033A3', width: '140px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            color='white'
            isLoading
            isBordered
          />
        </div>
      </div>
      <h2>With icon</h2>
      <div
        className='story -blue' style={{
          display: 'flex', flexDirection: 'row', width: '100%',
        }}
      >
        <div style={{
          padding: '10px', backgroundColor: '#0033A3', width: '225px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Get more addresses'
            iconColor='white'
            color='white'
            iconName='plus'
            isBordered
          />
        </div>
        <div style={{
          padding: '10px', backgroundColor: '#0033A3', width: '225px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Get more addresses'
            iconColor='white'
            color='white'
            iconName='plus'
            isDisabled
            isBordered
          />
        </div>
        <div style={{
          padding: '10px', backgroundColor: '#0033A3', width: '225px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            color='white'
            isLoading
            isBordered
          />
        </div>
      </div>
    </div>
  ))
  .add('Different color', () => (
    <div>
      <h2>Blue color</h2>
      <div style={{
        display: 'flex', flexDirection: 'row', width: '100%',
      }}
      >
        <div style={{
          padding: '10px', width: '140px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
            isBordered
          />
        </div>
        <div style={{
          padding: '10px', width: '140px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
            isDisabled
            isBordered
          />
        </div>
        <div style={{
          padding: '10px', width: '140px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            color='blue'
            isLoading
            isBordered
          />
        </div>
        <div style={{
          padding: '10px', width: '225px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Get more addresses'
            iconColor='blue'
            color='blue'
            iconName='plus'
            isBordered
          />
        </div>
      </div>
    </div>
  ))
  .add('No border', () => (
    <div>
      <h2>No border</h2>
      <div style={{
        display: 'flex', flexDirection: 'row', width: '100%',
      }}
      >
        <div style={{
          padding: '10px', width: '140px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
            isHoverOpacity
          />
        </div>
        <div style={{
          padding: '10px', width: '225px',
        }}
        >
          <JFlatButton
            onClick={action('onClick')}
            label='Get more addresses'
            iconColor='blue'
            color='blue'
            iconName='plus'
            isHoverOpacity
          />
        </div>
      </div>
    </div>
  ))
