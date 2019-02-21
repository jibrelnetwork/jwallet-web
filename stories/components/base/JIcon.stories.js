// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../../src/components/base/JIcon'

const files = require.context('../../../src/public/assets/icons/new-pack/svg', true, /.*\.svg$/)
files.keys().forEach(x => files(x))

storiesOf('JIcon')
  .add('Different sizes', () => (
    <div>
      {console.error(files)}

      <JIcon name='close' />
    </div>
  ))
