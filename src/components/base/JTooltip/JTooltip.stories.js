// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  JIcon,
  JTooltip,
} from 'components/base'

storiesOf('JTooltip', module)
  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <div style={{ paddingLeft: '50px' }}>
        <JTooltip
          text='Some tooltip'
        >
          <JIcon
            name='edit'
            color='blue'
          />
        </JTooltip>
      </div>
    </div>
  ))
