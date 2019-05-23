// @flow

import React from 'react'
import { withState } from 'recompose'
import { storiesOf } from '@storybook/react'

import { JSwitch } from 'components/base'

const StateHOC = withState('value', 'setValue', '')

// $FlowFixMe
storiesOf('JSwitch')
  .add('Default', () => (
    <div className='story'>
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JSwitch
            name='Test'
            onChange={setValue}
            isChecked={value}
          />
        ),
      ))}
    </div>
  ))
  .add('Disabled', () => (
    <div className='story'>
      {React.createElement(StateHOC(
        ({
          value, setValue,
        }) => (
          <JSwitch
            name='Test'
            isDisabled
            onChange={setValue}
            isChecked={value}
          />
        ),
      ))}
    </div>
  ))
  .add('Disabled + checked', () => (
    <div className='story'>
      <JSwitch
        name='Test'
        onChange={() => null}
        isDisabled
        isChecked
      />
    </div>
  ))
