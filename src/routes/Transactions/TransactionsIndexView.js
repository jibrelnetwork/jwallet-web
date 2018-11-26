// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { JSearch, JTabs } from 'components/base'
import { TransactionsList, TransactionsFilter } from 'components'

type Props = {|
  +setIsOnlyPending: (boolean) => void,
  +changeSearchInput: (string) => void,
  +transactions: TransactionWithAssetAddress[],
  +digitalAssets: DigitalAssets,
  +searchQuery: string,
  +isOnlyPending: boolean,
|}

const TRANSACTIONS_TABS = {
  '/digital-assets': 'Digital assets',
  '/transactions': 'Transactions',
}

function TransactionsIndexView({
  setIsOnlyPending,
  changeSearchInput,
  transactions,
  digitalAssets,
  searchQuery,
  isOnlyPending,
}: Props) {
  const filterCount: number = isOnlyPending ? 1 : 0

  return (
    <div className='transactions-view -index'>
      <div className='header'>
        <div className='container'>
          <JTabs tabs={TRANSACTIONS_TABS} />
          <div className='actions'>
            <div className='search'>
              <JSearch
                onChange={changeSearchInput}
                value={searchQuery}
                placeholder='Search transactions...'
              />
            </div>
            <div className='filter'>
              <TransactionsFilter
                setOnlyPending={setIsOnlyPending}
                filterCount={filterCount}
                isOnlyPending={isOnlyPending}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='content'>
        <Scrollbars autoHide>
          <TransactionsList
            items={transactions}
            digitalAssets={digitalAssets}
            isFiltered={!!filterCount || !!searchQuery}
          />
        </Scrollbars>
      </div>
    </div>
  )
}

export default TransactionsIndexView
