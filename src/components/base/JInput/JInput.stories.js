
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
        ({
          value, setValue,
        }) => (
          <JInput
            onChange={setValue}
            value={value}
            type='text'
            color='gray'
            placeholder='Placeholder'
          />
        ),
      ))}
    </div>
  ))
  .add('Gray multiline', () => (
    <div className='story'>
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JInput
            onChange={setValue}
            value={value}
            type='text'
            color='gray'
            placeholder='Your Address'
            rows={8}
          />
        ),
      ))}
    </div>
  ))
  .add('Gray text disabled', () => (
    <div className='story'>
      <JInput
        type='text'
        color='gray'
        value='Some text'
        label='Some label'
        placeholder='Enter some text'
        isDisabled
      />
    </div>
  ))
  .add('Gray text with validation error', () => (
    <div className='story'>
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JInput
            onChange={setValue}
            value={value}
            type='text'
            color='gray'
            label='Some label'
            errorMessage='Some error'
            placeholder='Enter some text'
          />
        ),
      ))}
    </div>
  ))
  .add('White text', () => (
    <div className='story -blue'>
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JInput
            onChange={setValue}
            value={value}
            type='text'
            color='white'
            placeholder='Wallet Name'
          />
        ),
      ))}
    </div>
  ))
  .add('White text with validation error', () => (
    <div className='story -blue' >
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JInput
            onChange={setValue}
            value={value}
            type='text'
            color='white'
            label='Some label'
            errorMessage='Some error'
            placeholder='Enter some text'
          />
        ),
      ))}
    </div>
  ))
  .add('White password with info message', () => (
    <div className='story -blue'>
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JInput
            onChange={setValue}
            value={value}
            color='white'
            type='password'
            label='Some label'
            infoMessage='Some info'
            placeholder='Enter some text'
          />
        ),
      ))}
    </div>
  ))
  .add('White pin code style', () => (
    <div className='story -blue'>
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JInput
            onChange={setValue}
            value={value}
            color='white'
            type='password'
            isPinCode
          />
        ),
      ))}
    </div>
  ))
  .add('White multiline', () => (
    <div className='story -blue'>
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JInput
            onChange={setValue}
            value={value}
            color='white'
            placeholder='Enter some text'
            rows={8}
          />
        ),
      ))}
    </div>
  ))
  .add('Different border-radius', () => (
    <div>
      <div className='story'>
        {React.createElement(StateHOC(
          ({
            value, setValue,
          }) => (
            <JInput
              onChange={setValue}
              value={value}
              type='text'
              color='gray'
              placeholder='Radius from all sides'
            />
          ),
        ))}
      </div>
      <div className='story'>
        {React.createElement(StateHOC(
          ({
            value, setValue,
          }) => (
            <JInput
              onChange={setValue}
              value={value}
              type='text'
              color='gray'
              placeholder='Radius on the top side'
              sideBorderRadius='top'
            />
          ),
        ))}
      </div>
      <div className='story'>
        {React.createElement(StateHOC(
          ({
            value, setValue,
          }) => (
            <JInput
              onChange={setValue}
              value={value}
              type='text'
              color='gray'
              placeholder='Radius on the right side'
              sideBorderRadius='right'
            />
          ),
        ))}
      </div>
      <div className='story'>
        {React.createElement(StateHOC(
          ({
            value, setValue,
          }) => (
            <JInput
              onChange={setValue}
              value={value}
              type='text'
              color='gray'
              placeholder='Radius on the bottom side'
              sideBorderRadius='bottom'
            />
          ),
        ))}
      </div>
      <div className='story'>
        {React.createElement(StateHOC(
          ({
            value, setValue,
          }) => (
            <JInput
              onChange={setValue}
              value={value}
              type='text'
              color='gray'
              placeholder='Radius on the left side'
              sideBorderRadius='left'
            />
          ),
        ))}
      </div>
    </div>
  ))
