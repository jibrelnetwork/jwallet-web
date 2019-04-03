// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JAssetSymbol from './JAssetSymbol'

storiesOf('JAssetSymbol')
  .add('Different colors', () => (
    <div>
      <h2>blue</h2>
      <div style={{
        display: 'flex', flexDirection: 'row', padding: '10px',
      }}
      >
        <JAssetSymbol symbol='eth' color='blue' />
        <JAssetSymbol symbol='jnt' color='blue' />
        <JAssetSymbol symbol='jaed' color='blue' />
      </div>
      <h2>gray</h2>
      <div style={{
        display: 'flex', flexDirection: 'row', padding: '10px',
      }}
      >
        <JAssetSymbol symbol='adt' color='gray' />
        <JAssetSymbol symbol='ast' color='gray' />
        <JAssetSymbol symbol='ant' color='gray' />
      </div>
      <h2>white</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        backgroundColor: '#666',
      }}
      >
        <JAssetSymbol symbol='jusd' color='white' />
        <JAssetSymbol symbol='jeur' color='white' />
        <JAssetSymbol symbol='jrub' color='white' />
      </div>
    </div>
  ))
