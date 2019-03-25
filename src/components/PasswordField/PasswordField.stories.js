/* @flow */

import React from 'react'
import { withState } from 'recompose'
import { storiesOf } from '@storybook/react'

import PasswordField from 'components/PasswordField'

const StateHOC = withState('password', 'setPassword', '')

storiesOf('PasswordField', module)
  .add('default state', () => (
    <div className='story -blue'>
      {React.createElement(StateHOC(
        ({
          password, setPassword, passwordConfirm,
        }) => (
          <PasswordField
            invalidFields={{}}
            value={password || ''}
            onPasswordChange={setPassword}
            onPasswordConfirmChange={() => {}}
            passwordConfirm={passwordConfirm}
            withConfirm
          />
        ),
      ))}
    </div>
  ))
