// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from 'components/base/JIcon'
import JTooltip from 'components/base/JTooltip'

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
            size='medium'
            color='blue'
          />
        </JTooltip>
      </div>
    </div>
  ))
