import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  AccountItem,
  CopyableField,
  Expandable,
  KeysManager,
  Transaction,
  TransactionManager,
  Search,
  QRCode,
  base,
} from '../src/components'

const { JTextInput } = base

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
          sendFunds={() => alert('sendFunds handler')}
          receiveFunds={() => alert('receiveFunds handler')}
          convertFunds={() => alert('convertFunds handler')}
          filter={() => () => alert('filter handler')}
          remove={() => alert('remove handler')}
        />
      </div>
    )
  })

storiesOf('Search', module)
  .add('Search', () => {
    return (
      <div style={{ margin: '20px' }}>
        <Search
          search={text => console.log(`${text} was requested`)}
          name='something'
          query=''
        />
      </div>
    )
  })

storiesOf('QRCode', module)
  .add('basic', () => {
    return (
      <div style={{ width: '80%', margin: '40px', background: '#fff' }}>
        <QRCode requisites={props.QRcodeConfigsBasic} />
      </div>
    )
  })
  .add('changed UI', () => {
    return (
      <div style={{ width: '80%', margin: '40px', background: '#fff' }}>
        <QRCode requisites={props.QRcodeConfigsBasic} appearance={props.QRcodeConfigsUI} />
      </div>
    )
  })

storiesOf('CopyableField', module)
  .add('common', () => {
    return (
      <div style={{ width: '420px', padding: '40px', background: '#fff' }}>
        <CopyableField value={props.transactions[0].from} placeholder='Address' />
      </div>
    )
  })

storiesOf('Expandable', module)
  .add('default', () => {
    return (
      <div style={{ backgroundColor: '#fff', padding: '20px', maxWidth: '420px' }}>
        <Expandable>
          <JTextInput
            onValueChange={text => console.log(text)}
            name='common'
            placeholder='Common Field'
            value={'34543'}
            errorMessage={''}
            successMessage={''}
            editable
          />
          <JTextInput
            onValueChange={text => console.log(text)}
            name='common'
            placeholder='Another Field'
            value={'Transfer name'}
            errorMessage={''}
            successMessage={''}
            editable
          />
        </Expandable>
      </div>
    )
  })
  .add('with optional params', () => {
    return (
      <div style={{ backgroundColor: '#fff', padding: '20px', maxWidth: '420px' }}>
        <Expandable title={'Display more fields'} iconName={'small-arrow'}>
          <JTextInput
            onValueChange={text => console.log(text)}
            name='common'
            placeholder='Common Field'
            value={'34543'}
            errorMessage={''}
            successMessage={''}
            editable
          />
          <JTextInput
            onValueChange={text => console.log(text)}
            name='common'
            placeholder='Another Field'
            value={'Transfer name'}
            errorMessage={''}
            successMessage={''}
            editable
          />
        </Expandable>
      </div>
    )
  })
