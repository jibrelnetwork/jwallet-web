
/* @flow */

import React from 'react'
import { withState } from 'recompose'
import { storiesOf } from '@storybook/react'

import JInput from '../../src/components/base/__new__/JInput'

const StateHOC = withState('value', 'setValue', '')

storiesOf('JInput', module)
  .add('Gray text', () => (
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
  .add('Gray text disabled', () => (
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
  .add('Gray text with validation error', () => (
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
  .add('White text', () => (
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
  .add('White text with validation error', () => (
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
  .add('White password with info message', () => (
    <div style={{ backgroundColor: '#0050DB' }}>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='password'
            label='Some label'
            color='white'
            value={value}
            onChange={setValue}
            placeholder='Enter some text'
            infoMessage='Some info'
          />
        )
      ))}
    </div>
  ))
  .add('White password checked', () => (
    <div style={{ backgroundColor: '#0050DB' }}>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='password'
            label='Some label'
            color='white'
            value={value}
            checked
            onChange={setValue}
            placeholder='Enter some text'
          />
        )
      ))}
    </div>
  ))
  .add('White multiline', () => (
    <div style={{ backgroundColor: '#0050DB' }}>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='text'
            label='Some label'
            color='white'
            value={value}
            onChange={setValue}
            multiline
            placeholder='Enter some text'
          />
        )
      ))}
    </div>
  ))
