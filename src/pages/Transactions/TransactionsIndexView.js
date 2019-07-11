// @flow

import React from 'react'
import { useI18n } from 'app/hooks'

import { type TransactionItem } from 'store/transactionsIndex'

import {
  Header, SearchFilter, SearchInput,
} from 'components/base'

import {
  TransactionsList,
} from 'components'

type Props = {|
  +transactions: TransactionItem[],
  +isLoading: boolean,
|}

function TransactionsIndexView({
  transactions,
  isLoading,
}: Props) {
  const i18n = useI18n()

  return (
    <div className='transactions-view -index'>
      <Header
        title={i18n._(
          'Transactions.history',
          null,
          { defaults: 'History' },
        )}
      >
        <SearchInput onChange={() => {}}>
          <SearchFilter
            activeCount={-1}
          >
            <span>Hi! I am a filter</span>
          </SearchFilter>
        </SearchInput>
      </Header>
      <TransactionsList
        items={transactions}
        isLoading={isLoading}
      />
    </div>
  )
}

export default TransactionsIndexView
