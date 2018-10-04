
/* @flow */

import React from 'react'
import { withState } from 'recompose'
import { storiesOf } from '@storybook/react'

import JInput from 'components/base/JInput'

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

  .add('Gray multiline', () => (
    <div className='story'>
      {React.createElement(StateHOC(
        ({ value, setValue }) => (
          <JInput
            type='text'
            color='gray'
            value={value}
            isMultiline
            onChange={setValue}
            placeholder='Your Address'
            render={inputProps => <textarea {...inputProps} rows='8' />}
          />
        )
      ))}
    </div>
  ))

  .add('Gray text disabled', () => (
    <div className='story'>
      <JInput
        type='text'
        color='gray'
        label='Some label'
        value='Some text'
        isDisabled
        placeholder='Enter some text'
      />
    </div>
  ))
  .add('Gray text with validation error', () => (
    <div className='story'>
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

  .add('White pin code style', () => (
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
            color='white'
            value={value}
            onChange={setValue}
            isMultiline
            placeholder='Enter some text'
            render={inputProps => <textarea {...inputProps} rows='4' />}
          />
        )
      ))}
    </div>
  ))
