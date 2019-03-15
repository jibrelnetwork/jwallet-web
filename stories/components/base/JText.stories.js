// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JText from '../../../src/components/base/JText'

storiesOf('JText')
  .add('Different sizes', () => (
    <div>
      <h2>small</h2>
      <JText
        size='small'
        color='gray'
        value='Lorem ipsum dolor sit amet'
      />
      <h2>normal</h2>
      <JText
        color='gray'
        size='normal'
        value='Lorem ipsum dolor sit amet'
      />
      <h2>large</h2>
      <JText
        size='large'
        color='gray'
        value='Lorem ipsum dolor sit amet'
      />
    </div>
  ))
  .add('Different alignments', () => (
    <div>
      <h2>default</h2>
      <JText
        size='large'
        color='gray'
        align={null}
        value='Lorem ipsum dolor sit amet'
      />
      <h2>center</h2>
      <JText
        size='large'
        color='gray'
        align='center'
        value='Lorem ipsum dolor sit amet'
      />
    </div>
  ))
  .add('Different colors', () => (
    <div>
      <h2>blue</h2>
      <div style={{ padding: '10px' }}>
        <JText
          color='blue'
          size='small'
          value='Lorem ipsum dolor sit amet'
        />
      </div>
      <h2>red</h2>
      <div style={{ padding: '10px' }}>
        <JText
          color='red'
          size='small'
          value='Lorem ipsum dolor sit amet'
        />
      </div>
      <h2>white</h2>
      <div style={{ padding: '10px', backgroundColor: '#666' }}>
        <JText
          size='small'
          color='white'
          value='Lorem ipsum dolor sit amet'
        />
      </div>
    </div>
  ))
  .add('Different cases', () => (
    <div>
      <h2>default</h2>
      <JText
        color='gray'
        fontCase={null}
        value='Lorem ipsum dolor sit amet'
      />
      <h2>upper</h2>
      <JText
        color='gray'
        fontCase='upper'
        value='Lorem ipsum dolor sit amet'
      />
    </div>
  ))
  .add('Different weights', () => (
    <div>
      <h2>default</h2>
      <JText
        color='gray'
        weight={null}
        value='Lorem ipsum dolor sit amet'
      />
      <h2>bold</h2>
      <JText
        color='gray'
        weight='bold'
        value='Lorem ipsum dolor sit amet'
      />
      <h2>bolder</h2>
      <JText
        color='gray'
        weight='bolder'
        value='Lorem ipsum dolor sit amet'
      />
    </div>
  ))
  .add('Different line wrappings', () => (
    <div style={{ width: '100px' }}>
      <h2>nowrap</h2>
      <JText
        color='gray'
        whiteSpace='nowrap'
        value='Lorem ipsum dolor sit amet'
      />
      <h2>wrap</h2>
      <JText
        color='gray'
        whiteSpace='wrap'
        value='Lorem ipsum dolor sit amet'
      />
    </div>
  ))
