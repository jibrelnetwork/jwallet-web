
/* @flow */

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import RoundIconButton from '../../../src/components/RoundIconButton'

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
            onClick={action('onClick')}
            color='white'
            iconName='padding-cross'
          />
        </div>
        <div style={{ padding: '3px' }}>
          <RoundIconButton
            onClick={action('onClick')}
            color='white'
            iconName='padding-lock'
            isBgColor
          />
        </div>
        <div style={{ padding: '3px' }}>
          <RoundIconButton
            onClick={action('onClick')}
            color='white'
            iconName='arrow-left'
            isBorder
          />
        </div>
      </div>
      <div style={{ padding: '3px' }}>
        <RoundIconButton
          onClick={action('onClick')}
          color='gray'
          iconName='arrow-up'
          isBoxShadow
        />
      </div>
    </div>
  ))
