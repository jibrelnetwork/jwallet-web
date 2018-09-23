
/* @flow */

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import JFlatButton from '../../../src/components/base/JFlatButton'

storiesOf('JFlatButton', module)
  .add('Different status', () => (
    <div>
      <h2>No icon</h2>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ padding: '10px', backgroundColor: '#0033A3', width: '140px' }} >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='white'
          />
        </div>
        <div style={{ padding: '10px', backgroundColor: '#0033A3', width: '140px' }} >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='white'
            isDisabled
          />
        </div>
        <div style={{ padding: '10px', backgroundColor: '#0033A3', width: '140px' }} >
          <JFlatButton
            onClick={action('onClick')}
            color='white'
            isLoading
          />
        </div>
      </div>
      <h2>With icon</h2>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ padding: '10px', backgroundColor: '#0033A3', width: '225px' }} >
          <JFlatButton
            onClick={action('onClick')}
            iconSize='small'
            label='Get more addresses'
            iconColor='white'
            color='white'
            iconName='plus'
          />
        </div>
        <div style={{ padding: '10px', backgroundColor: '#0033A3', width: '225px' }} >
          <JFlatButton
            onClick={action('onClick')}
            iconSize='small'
            label='Get more addresses'
            iconColor='white'
            color='white'
            iconName='plus'
            isDisabled
          />
        </div>
        <div style={{ padding: '10px', backgroundColor: '#0033A3', width: '225px' }} >
          <JFlatButton
            onClick={action('onClick')}
            color='white'
            isLoading
          />
        </div>

      </div>
      <h2>Link theme</h2>
      <div style={{ padding: '10px', backgroundColor: '#0033A3' }} >
        <JFlatButton
          onClick={action('onClick')}
          label='Yes, delete'
          color='white'
          isLink
        />
      </div>
    </div>
  ))
  .add('Different color', () => (
    <div>
      <h2>Blue color</h2>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ padding: '10px', width: '140px' }} >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
          />
        </div>
        <div style={{ padding: '10px', width: '140px' }} >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
            isDisabled
          />
        </div>
        <div style={{ padding: '10px', width: '140px' }} >
          <JFlatButton
            onClick={action('onClick')}
            color='blue'
            isLoading
          />
        </div>
        <div style={{ padding: '10px', width: '225px' }} >
          <JFlatButton
            onClick={action('onClick')}
            iconSize='small'
            label='Get more addresses'
            iconColor='blue'
            color='blue'
            iconName='plus'
          />
        </div>
        <div style={{ padding: '10px' }} >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='blue'
            isLink
          />
        </div>
      </div>
    </div>
  ))
  .add('Event', () => (
    <div>
      <h2>Hover</h2>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ padding: '10px' }} >
          <JFlatButton
            onClick={action('onClick')}
            label='Yes, delete'
            color='sky'
            isLink
          />
        </div>
      </div>
    </div>
  ))
