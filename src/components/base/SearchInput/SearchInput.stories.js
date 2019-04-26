// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { SearchInput } from './SearchInput'

storiesOf('base|Search Input', module).addDecorator(withKnobs)
  .add('Basic', () => (
    <div style={{ padding: 20 }}>
      <SearchInput />
    </div>
  ))
