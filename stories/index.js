import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import '../src/styles/core.scss'

import JbButton from '../src/components/JbButton'
import JbIcon from '../src/components/base/JbIcon'
import JbLogo from '../src/components/base/JbLogo'
import JbAccountItem from '../src/components/base/JbAccountItem'
import JbInput from '../src/components/base/JbInput'
import JbSelect from '../src/components/base/JbSelect'
import JbLoader from '../src/components/base/JbLoader'

import KeysManager from '../src/components/KeysManager'
import Transaction from '../src/components/Transaction'
import TransactionManager from '../src/components/TransactionManager'

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

const accountsStyle = {
  backgroundColor: '#2d2c3e',
  background: 'linear-gradient(to top, #2d2c3e, #474667)',
}

storiesOf('JbAccountItem', module)
  .add('common', () => {
    return (
      <div style={accountsStyle}>
        <JbAccountItem symbol='ETH' balance='12.990' />
      </div>
    )
  })
  .add('active', () => {
    return (
      <div style={accountsStyle}>
        <JbAccountItem symbol='jUSD' balance='12.990' isActive />
      </div>
    )
  })
  .add('authorization required', () => {
    return (
      <div style={accountsStyle}>
        <JbAccountItem symbol='jEUR' balance='12.990' isAuthRequired />
      </div>
    )
  })
  .add('without balance', () => {
    return (
      <div style={accountsStyle}>
        <JbAccountItem symbol='jGBP' />
      </div>
    )
  })
  .add('authorization required and licensed', () => {
    return (
      <div style={accountsStyle}>
        <JbAccountItem symbol='JNT' isAuthRequired isLicensed />
      </div>
    )
  })

const keys = [
  { privateKey: '0x12E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x22E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x32E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x42E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x52E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x62E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
]

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

const currencyList = [{
  text: 'USD',
}, {
  text: 'EUR',
}, {
  text: 'GBK',
}]

storiesOf('JbSelect', module)
  .add('common', () => {
    return (
      <JbSelect
        error={null}
        label={'Currency'}
        list={currencyList}
      />
    )
  })
  .add('selected', () => {
    return (
      <JbSelect
        error={null}
        label={'Currency'}
        list={currencyList}
        selected={currencyList[0]}
      />
    )
  })

storiesOf('JbLoader', module)
  .add('common', () => {
    return (
      <div style={{ width: '200px', height: '100px', position: 'relative', border: '3px solid #999' }}>
        <JbLoader />
      </div>
    )
  })
  .add('fixed', () => {
    return <JbLoader fixed />
  })

storiesOf('KeysManager', module)
  .add('Keys Manager', () => {
    return (
      <div style={{ margin: '40px 100px' }}>
        <KeysManager
          setActiveKey={index => { return () => alert(`Key ${index + 1} picked`) }}
          addNewKeys={() => { return alert('addNewKeys handler') }}
          importKeys={() => { return alert('importKeys handler') }}
          backupKeys={() => { return alert('backupKeys handler') }}
          clearKeys={() => { return alert('clearKeys handler') }}
          keys={keys}
          active={1}
        />
      </div>
    )
  })

storiesOf('Transaction', module)
  .add('Transaction', () => {
    return (
      <div style={{ margin: '20px auto', width: '800px', background: '#fff' }}>
        <Transaction
          type={'receive'}
          symbol={'ETH'}
          status={'Pending'}
          from={'0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'}
          to={'0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'}
          txHash={'0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d'}
          fee={'0.0005 ETH 1.5 JNT'}
          amount={'0.200'}
          timestamp={Date.now()}
        />
        <Transaction
          type={'send'}
          symbol={'ETH'}
          status={'Accepted'}
          from={'0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'}
          to={'0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'}
          txHash={'0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d'}
          fee={'0.0005 ETH 1.5 JNT'}
          amount={'0.200'}
          timestamp={Date.now()}
        />
        <Transaction
          type={'receive'}
          symbol={'ETH'}
          status={'Rejected'}
          from={'0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'}
          to={'0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'}
          txHash={'0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d'}
          fee={'0.0005 ETH 1.5 JNT'}
          amount={'0.200'}
          timestamp={Date.now()}
        />
        <Transaction
          type={'send'}
          symbol={'ETH'}
          status={'Waiting'}
          from={'0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'}
          to={'0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'}
          txHash={'0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d'}
          fee={'0.0005 ETH 1.5 JNT'}
          amount={'0.200'}
          timestamp={Date.now()}
        />
      </div>
    )
  })

storiesOf('TransactionManager', module)
  .add('Transaction Manager', () => {
    return (
      <div style={{ margin: '40px 100px 40px 300px' }}>
        <TransactionManager
          sendFunds={() => { return alert('sendFunds handler') }}
          receiveFunds={() => { return alert('receiveFunds handler') }}
          convertFunds={() => { return alert('convertFunds handler') }}
          filter={() => { return alert('filter handler') }}
          remove={() => { return alert('remove handler') }}
        />
      </div>
    )
  })
