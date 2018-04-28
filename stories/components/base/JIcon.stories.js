// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../../src/components/base/JIcon'

storiesOf('JIcon')
  .add('Different sizes', () => (
    <div>
      <h2>{'small'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          color='gray'
          size='small'
          name='close'
        />
        <JIcon
          color='gray'
          size='small'
          name='info-clear'
        />
        <JIcon
          color='gray'
          size='small'
          name='settings'
        />
      </div>
      <h2>{'medium'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          color='gray'
          size='medium'
          name='logout'
        />
        <JIcon
          color='gray'
          size='medium'
          name='close-header'
        />
        <JIcon
          color='gray'
          size='medium'
          name='search'
        />
      </div>
      <h2>{'large'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          size='large'
          color='gray'
          name='transaction-send'
        />
        <JIcon
          size='large'
          color='blue'
          name='transaction-receive'
        />
      </div>
    </div>
  ))
  .add('Different colors', () => (
    <div>
      <h2>{'blue'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          size='small'
          name='arrow'
          color='blue'
        />
        <JIcon
          size='small'
          color='blue'
          name='checkbox'
        />
        <JIcon
          size='small'
          color='blue'
          name='plus'
        />
        <JIcon
          size='small'
          color='blue'
          name='repeat'
        />
        <JIcon
          name='star'
          size='small'
          color='blue'
        />
      </div>
      <h2>{'gray'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          name='close'
          size='small'
          color='gray'
        />
        <JIcon
          size='small'
          color='gray'
          name='expand'
        />
        <JIcon
          name='eye'
          size='small'
          color='gray'
        />
        <JIcon
          name='lock'
          size='small'
          color='gray'
        />
      </div>
    </div>
  ))
