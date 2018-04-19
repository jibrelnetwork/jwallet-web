// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../src/components/base/JIcon'
import JTooltip from '../../src/components/base/JTooltip'

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
