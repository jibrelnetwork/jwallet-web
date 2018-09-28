
/* @flow */

import React from 'react'
import { withState } from 'recompose'
import { storiesOf } from '@storybook/react'

import JInput from '../../src/components/base/JInput'

const StateHOC = withState('value', 'setValue', '')

storiesOf('JInput', module)
  .add('Gray text', () => (
    <div className='story'>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='text'
            color='gray'
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
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
    <div className='story -blue'>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='text'
            color='white'
            value={value}
            onChange={setValue}
            placeholder='Wallet Name'
          />
        )
      ))}
    </div>
  ))
  .add('White text with validation error', () => (
    <div className='story -blue' >
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
    <div className='story -blue'>
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
  .add('White password with password status bar', () => (
    <div className='story -blue'>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='password'
            label='Some label'
            color='white'
            value={value}
            passwordStrength='0'
            onChange={setValue}
            placeholder='Enter some text'
          />
        )
      ))}
    </div>
  ))
  .add('White pin code', () => (
    <div className='story -blue'>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            isPinCode
            type='password'
            color='white'
            value={value}
            onChange={setValue}
          />
        )
      ))}
    </div>
  ))
  .add('White multiline', () => (
    <div className='story -blue'>
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
