
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import JThumbnail from '../../src/components/base/JThumbnail'

storiesOf('JThumbnail', module)
  .add('White', () => (
    <div style={{ backgroundColor: '#0050db' }}>
      <JThumbnail
        image='cloud-blue'
        color='white'
        title='Backup current key'
        description={`All user data, including imported or generated \n private keys are stored locally, meaning your private`}
      />
    </div>
  ))
  .add('Gray', () => (
    <JThumbnail
      image='cloud-white'
      color='gray'
      title='Backup current key'
      description={"All user data, including imported or generated \n private keys are stored locally, meaning your private"}
    />
  ))
