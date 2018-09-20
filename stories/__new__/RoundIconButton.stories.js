
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import RoundIconButton from '../../src/components/RoundIconButton'

storiesOf('RoundIconButton', module)
  .add('Different view', () => (
    <div>
      <div style={{
        backgroundColor: '#0033A3',
        display: 'flex',
        flexDirection: 'row',
        padding: '5px',
      }}
      >
        <div style={{ padding: '3px' }}>
          <RoundIconButton
            color='white'
            iconName='padding-cross'
          />
        </div>
        <div style={{ padding: '3px' }}>
          <RoundIconButton
            color='white'
            iconName='padding-lock'
            isBgColor='true'
          />
        </div>
        <div style={{ padding: '3px' }}>
          <RoundIconButton
            color='white'
            iconName='arrow-left'
            isBorder='true'
          />
        </div>
      </div>
    </div>
  ))
