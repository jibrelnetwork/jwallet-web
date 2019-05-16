// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { SearchInput } from './SearchInput'

storiesOf('base|Search Input', module)
  .add('Basic', () => (
    <div style={{ padding: 20 }}>
      <SearchInput onChange={action('On change handler')} />
    </div>
  ))
