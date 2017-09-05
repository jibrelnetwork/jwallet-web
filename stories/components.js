import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AccountItem from '../src/components/AccountItem'
import KeysManager from '../src/components/KeysManager'
import Transaction from '../src/components/Transaction'
import TransactionManager from '../src/components/TransactionManager'
import Header from '../src/components/Header'
import YourAccounts from '../src/components/YourAccounts'
import Search from '../src/components/Search'
import TransactionsTable from '../src/components/TransactionsTable'

import props from './props'

storiesOf('AccountItem', module)
  .add('common', () => {
    return <div style={props.accountsStyle}><AccountItem {...props.accounts[0]} /></div>
  })
  .add('active', () => {
    return <div style={props.accountsStyle}><AccountItem {...props.accounts[1]} /></div>
  })
  .add('authorization required', () => {
    return <div style={props.accountsStyle}><AccountItem {...props.accounts[2]} /></div>
  })
  .add('authorization required and licensed', () => {
    return <div style={props.accountsStyle}><AccountItem {...props.accounts[3]} /></div>
  })

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

storiesOf('YourAccounts', module)
  .add('YourAccounts', () => {
    return (
      <YourAccounts
        searchAccounts={() => alert('searchAccounts handler')}
        addCustomToken={() => alert('addCustomToken handler')}
      />
    )
  })

storiesOf('Search', module)
  .add('common', () => {
    return (
      <div style={{ margin: '20px' }}>
        <Search
          placeholder='Search transactions...'
          search={text => { return console.log(`Text ${text} was requested`) }}
        />
      </div>
    )
  })

storiesOf('TransactionsTable', module)
  .add('TransactionsTable', () => {
    return (
      <div style={{width: '80%'}}>
        <TransactionsTable transactions={props.transactions} />
      </div>
    )
  })
