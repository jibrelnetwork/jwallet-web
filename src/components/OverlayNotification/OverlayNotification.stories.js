// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import OverlayNotification from 'components/OverlayNotification'

storiesOf('OverlayNotification')

  .add('Default', () => (
    <div className='story'>
      <OverlayNotification
        color='gray'
        image='screen-reload'
        description={['Some text']}
        isTransparent
      />
    </div>
  ))
  .add('Red color', () => (
    <div className='story'>
      <OverlayNotification
        color='red'
        image='screen-error'
        description={['Internet connection error.', 'Try again.']}
      />
    </div>
  ))
