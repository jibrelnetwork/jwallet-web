import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  text,
  withKnobs,
} from '@storybook/addon-knobs'

import { Header } from 'components/base'

storiesOf('base|Header', module).addDecorator(withKnobs)
  .add('Customizable', () => (
    <div>
      <Header title={text('Header Text', 'Default header title')} />
    </div>
  ))
  .add('With other things inside', () => (
    <div>
      <Header title='Header'>
        <button type='button' style={{ marginLeft: 24 }}>Hello</button>
        <button type='button' style={{ marginLeft: 24 }}>Darkness</button>
        <button type='button' style={{ marginLeft: 24 }}>My</button>
        <button type='button' style={{ marginLeft: 24 }}>Old</button>
        <button type='button' style={{ marginLeft: 24 }}>Friend</button>
      </Header>
    </div>
  ))
