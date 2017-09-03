import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import KeysManager from '../src/components/KeysManager'
import Transaction from '../src/components/Transaction'
import TransactionManager from '../src/components/TransactionManager'
import Header from '../src/components/Header'
import AccountManager from '../src/components/AccountManager'

import props from './props'

storiesOf('KeysManager', module)
  .add('Keys Manager', () => {
    return (
      <div style={{ margin: '40px 100px' }}>
        <KeysManager {...props.keysManagerProps} />
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
          sendFunds={() => alert('sendFunds handler') }
          receiveFunds={() => alert('receiveFunds handler') }
          convertFunds={() => alert('convertFunds handler') }
          filter={() => alert('filter handler') }
          remove={() => alert('remove handler') }
        />
      </div>
    )
  })

storiesOf('Header', module)
  .add('Header', () => {
    return (
      <Header
        {...props.keysManagerProps}
        sendFunds={() => alert('sendFunds handler')}
        receiveFunds={() => alert('receiveFunds handler')}
        convertFunds={() => alert('convertFunds handler')}
      />
    )
  })

storiesOf('AccountManager', module)
  .add('AccountManager', () => {
    return (
      <AccountManager
        searchAccounts={() => alert('searchAccounts handler')}
        addCustomToken={() => alert('addCustomToken handler')}
      />
    )
  })
