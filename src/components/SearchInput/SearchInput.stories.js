// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  number,
  withKnobs,
} from '@storybook/addon-knobs'

import SearchFilter from 'components/SearchFilter'

import SearchInput from './SearchInput'

storiesOf('base|Search Input', module)
  .addDecorator(withKnobs)
  .add('Basic', () => (
    <div style={{ padding: 20 }}>
      <SearchInput onChange={action('On change handler')} />
    </div>
  ))
  .add('With Filter', () => (
    <div style={{ padding: 20 }}>
      <SearchInput onChange={action('On change handler')}>
        <SearchFilter activeCount={number('Number of active filters', 0)}>
          <span>Hi! I am a filter</span>
        </SearchFilter>
      </SearchInput>
    </div>
  ))
