
/* @flow */

import React from 'react'
import { withState } from 'recompose'
import { storiesOf } from '@storybook/react'

import JInput from '../../src/components/base/__new__/JInput'

const StateHOC = withState('value', 'setValue', '')

storiesOf('JInput', module)
  .add('Gray', () => (
    <div>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='text'
            color='gray'
            label='Some label'
            value={value}
            onChange={setValue}
            placeholder='Enter some text'
          />
        )
      ))}
    </div>
  ))
  .add('Gray disabled', () => (
    <div>
      <JInput
        type='text'
        color='gray'
        label='Some label'
        value='Some text'
        disabled
        placeholder='Enter some text'
      />
    </div>
  ))
  .add('Gray with validation error', () => (
    <div>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='text'
            label='Some label'
            color='gray'
            value={value}
            onChange={setValue}
            placeholder='Enter some text'
            errorMessage='Some error'
          />
        )
      ))}
    </div>
  ))
  .add('White', () => (
    <div style={{ backgroundColor: '#0050DB' }}>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='text'
            color='white'
            label='Some label'
            value={value}
            onChange={setValue}
            placeholder='Enter some text'
          />
        )
      ))}
    </div>
  ))
  .add('White with validation error', () => (
    <div style={{ backgroundColor: '#0050DB' }}>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='text'
            label='Some label'
            color='white'
            value={value}
            onChange={setValue}
            placeholder='Enter some text'
            errorMessage='Some error'
          />
        )
      ))}
    </div>
  ))