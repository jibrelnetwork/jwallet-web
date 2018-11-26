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
  +ownerAddress: ?OwnerAddress,
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
  ownerAddress,
}: Props) {
  if (!ownerAddress) {
    return null
  }

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
                filterCount={isOnlyPending ? 1 : 0}
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
            ownerAddress={ownerAddress}
            digitalAssets={digitalAssets}
          />
        </Scrollbars>
      </div>
    </div>
  )
}

export default TransactionsIndexView
