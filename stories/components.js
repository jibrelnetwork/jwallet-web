import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  AccountItem,
  KeysManager,
  Transaction,
  TransactionManager,
  Header,
  YourAccounts,
  Search,
  TransactionsTable,
} from '../src/components'

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
        <Transaction {...props.transactions[0]} />
        <Transaction {...props.transactions[1]} />
        <Transaction {...props.transactions[2]} />
        <Transaction {...props.transactions[3]} />
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
  .add('Search', () => {
    return (
      <div style={{ margin: '20px' }}>
        <Search name='something' search={text => { return console.log(`${text} was requested`) }} />
      </div>
    )
  })

storiesOf('TransactionsTable', module)
  .add('TransactionsTable', () => {
    return (
      <div style={{width: '80%', margin: '40px', background: '#fff'}}>
        <TransactionsTable items={props.transactions} sortField='timestamp' />
      </div>
    )
  })
