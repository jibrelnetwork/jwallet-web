
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import { JIcon, JTooltip } from '../../src/components/base'

storiesOf('JTooltip', module)
  .add('Default', () => (
    <div>
      <JTooltip
        text='some tooltip'
      >
        <JIcon
          name='info-gray'
          size='small'
          transparent
        />
      </JTooltip>
    </div>
  ))
