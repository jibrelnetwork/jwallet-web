import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import '../src/styles/core.scss'

import JbButton from '../src/components/JbButton'
import JbIcon from '../src/components/base/JbIcon'
import JbLogo from '../src/components/base/JbLogo'
import JbAccountItem from '../src/components/base/JbAccountItem'

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
  .add('common', () => (
    <JbLogo />
  ))

const accountsStyle = {
  backgroundColor: '#2d2c3e',
  background: 'linear-gradient(to top, #2d2c3e, #474667)',
}

storiesOf('JbAccountItem', module)
  .add('common', () => (
    <div style={accountsStyle}>
      <JbAccountItem symbol='ETH' balance='12.990' />
    </div>
  ))
  .add('active', () => (
    <div style={accountsStyle}>
      <JbAccountItem symbol='jUSD' balance='12.990' isActive />
    </div>
  ))
  .add('authorization required', () => (
    <div style={accountsStyle}>
      <JbAccountItem symbol='jEUR' balance='12.990' isAuthRequired />
    </div>
  ))
  .add('without balance', () => (
    <div style={accountsStyle}>
      <JbAccountItem symbol='jGBP' />
    </div>
  ))
  .add('authorization required and licensed', () => (
    <div style={accountsStyle}>
      <JbAccountItem symbol='JNT' isAuthRequired isLicensed />
    </div>
  ))
