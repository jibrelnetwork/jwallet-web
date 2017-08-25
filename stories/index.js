import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import '../src/styles/core.scss'

import JbButton from '../src/components/JbButton'
import JbIcon from '../src/components/base/JbIcon'
import JbLogo from '../src/components/base/JbLogo'

storiesOf('JbButton', module)
  .add('with text', () => (
    <JbButton onClick={action('clicked')} text="Hello Button" />
  ))
  .add('with some emoji', () => (
    <JbButton onClick={action('clicked')} text="😀 😎 👍 💯" />
  ))

storiesOf('JbIcon', module)
  .add('common', () => (
    <JbIcon name='send' />
  ))
  .add('small', () => (
    <JbIcon name='convert' small />
  ))

storiesOf('JbLogo', module)
  .add('common logo', () => (
    <JbLogo />
  ))
