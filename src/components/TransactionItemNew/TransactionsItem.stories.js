// @flow

import React, { PureComponent } from 'react'
import createRouter5 from 'router5'
import browserPlugin from 'router5-plugin-browser'
import { RouterProvider } from 'react-router5'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  number,
} from '@storybook/addon-knobs'

import { ethereum } from 'data/assets'

import { PureTransactionItem as TransactionItem } from './TransactionItem'

function getRandomAmount(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function generateFakeAddress(length) {
  // eslint-disable-next-line no-bitwise
  return `0x${[...new Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('')}`
}

function getTransaction() {
  const id = generateFakeAddress(40)
  const inOut = Math.random() > 0.5 ? 'in' : 'out'
  const status =
    Math.random() < 0.1
      ? 'fail'
      : Math.random() > 0.5 && inOut === 'out'
        ? Math.random() > 0.5
          ? 'pending'
          : 'stuck'
        : 'success'

  return {
    id,
    asset: ethereum,
    type: inOut,
    status,
    title: Math.random() < 0.8 ? id : `Address name ${Math.random()}`,
    note: Math.random() < 0.3 ? Math.random().toString(36) : '',
    amount: `${inOut === 'in' ? '+' : '-'}${getRandomAmount(999999)}000000000000000`,
    fiatAmount: '',
  }
}

type ListProps = { items: React$Node[] }
type ListState = { activeItem: string }

class TransactionsList extends PureComponent<ListProps, ListState> {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: '',
    }
  }

  onClick = (hash) => {
    action('Transaction click')(hash)
    this.setState({ activeItem: hash })
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.props.transaction.id}>
            {{
              ...item,
              props: {
                ...item.props,
                isActive: this.state.activeItem === item.props.transaction.id,
                onClick: this.onClick,
              },
            }}
          </li>
        ))}
      </ul>
    )
  }
}

storiesOf('TransactionItemNew', module)
  .addDecorator(withKnobs)
  .add('In list', () => {
    const router = createRouter5([], {
      allowNotFound: true,
    })
    router.usePlugin(browserPlugin())

    const items = [...new Array(number('Length', 1))].map(() => {
      const transaction = getTransaction()

      return (
        <TransactionItem
          key={transaction.id}
          txAddress={transaction.id}
          offset='mb16'
          transaction={transaction}
        />
      )
    })

    return (
      <RouterProvider router={router}>
        <div className='story'>
          <TransactionsList items={items} />
        </div>
      </RouterProvider>
    )
  })
