import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import JbButton from '../src/components/JbButton'
import JbIcon from '../src/components/base/JbIcon'
import JbLogo from '../src/components/base/JbLogo'
import JbAccountItem from '../src/components/base/JbAccountItem'
import JbInput from '../src/components/base/JbInput'
import JbSelect from '../src/components/base/JbSelect'
import JbLoader from '../src/components/base/JbLoader'
import JbSearch from '../src/components/base/JbSearch'

import props from './props'

storiesOf('JbButton', module)
  .add('with text', () => {
    return (
      <JbButton onClick={action('clicked')} text="Hello Button" />
    )
  })
  .add('with some emoji', () => {
    return (
      <JbButton onClick={action('clicked')} text="😀 😎 👍 💯" />
    )
  })

storiesOf('JbIcon', module)
  .add('common', () => {
    return (
      <JbIcon name='send' />
    )
  })
  .add('small', () => {
    return (
      <JbIcon name='convert' small />
    )
  })

storiesOf('JbLogo', module)
  .add('common', () => {
    return (
      <JbLogo />
    )
  })

storiesOf('JbAccountItem', module)
  .add('common', () => {
    return (
      <div style={props.accountsStyle}>
        <JbAccountItem symbol='ETH' balance='12.990' />
      </div>
    )
  })
  .add('active', () => {
    return (
      <div style={props.accountsStyle}>
        <JbAccountItem symbol='jUSD' balance='12.990' isActive />
      </div>
    )
  })
  .add('authorization required', () => {
    return (
      <div style={props.accountsStyle}>
        <JbAccountItem symbol='jEUR' balance='12.990' isAuthRequired />
      </div>
    )
  })
  .add('without balance', () => {
    return (
      <div style={props.accountsStyle}>
        <JbAccountItem symbol='jGBP' />
      </div>
    )
  })
  .add('authorization required and licensed', () => {
    return (
      <div style={props.accountsStyle}>
        <JbAccountItem symbol='JNT' isAuthRequired isLicensed />
      </div>
    )
  })

storiesOf('JbInput', module)
  .add('common', () => {
    return (
      <JbInput
        error={null}
        label={'Account name'}
        placeholder={'Mr. Cardholder'}
      />
    )
  })
  .add('error', () => {
    return (
      <JbInput
        error={'Missing name'}
        label={'Account name'}
        placeholder={'Mr. Cardholder'}
      />
    )
  })

storiesOf('JbSelect', module)
  .add('common', () => {
    return (
      <JbSelect
        error={null}
        label={'Currency'}
        list={props.currencyList}
      />
    )
  })
  .add('selected', () => {
    return (
      <JbSelect
        error={null}
        label={'Currency'}
        list={props.currencyList}
        selected={props.currencyList[0]}
      />
    )
  })

storiesOf('JbLoader', module)
  .add('common', () => {
    return (
      <div style={props.loaderStyle}>
        <JbLoader />
      </div>
    )
  })
  .add('fixed', () => {
    return <JbLoader fixed />
  })

storiesOf('JbSearch', module)
  .add('common', () => {
    return (
      <div style={{ margin: '20px' }}>
        <JbSearch
          placeholder='Search transactions ...'
          search={text => { return console.log(`Text ${text} was requested`) }}
        />
      </div>
    )
  })
