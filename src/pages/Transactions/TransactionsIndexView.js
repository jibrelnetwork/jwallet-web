// @flow

import React from 'react'
import { t } from 'ttag'

import {
  Header, SearchFilter, SearchInput,
} from 'components/base'

import {
  TransactionsList,
} from 'components'

type Props = {|
  +transactions: TransactionWithPrimaryKeys[],
  +network: ?Network,
  +ownerAddress: ?OwnerAddress,
  +searchQuery: string,
  +isLoading: boolean,
  +isOnlyPending: boolean,
|}

function TransactionsIndexView({
  transactions,
  network,
  searchQuery,
  ownerAddress,
  isLoading,
  isOnlyPending,
}: Props) {
  if (!(ownerAddress && network)) {
    return null
  }

  const filterCount: number = isOnlyPending ? 1 : 0

  return (
    <div className='transactions-view -index'>
      <Header
        title={t`History`}
      >
        <SearchInput onChange={() => {}}>
          <SearchFilter
            activeCount={-1}
          >
            <span>Hi! I am a filter</span>
          </SearchFilter>
        </SearchInput>
      </Header>
      <div className='content'>
        <TransactionsList
          items={transactions}
          isLoading={isLoading}
          isFiltered={!!filterCount || !!searchQuery}
        />
      </div>
    </div>
  )
}

export default TransactionsIndexView
