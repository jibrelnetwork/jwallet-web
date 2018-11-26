// @flow

import React from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import { JSearch, JTabs } from 'components/base'

import {
  TransactionsList,
  // TransactionsFilter,
} from 'components'

const DIGITAL_ASSETS_TABS = {
  '/digital-assets': 'Digital assets',
  '/transactions': 'Transactions',
}

type Props = {|
  +setSearchQuery: (string) => void,
  +transactions: TransactionWithAssetAddress[],
  +digitalAssets: DigitalAssets,
  +ownerAddress: ?OwnerAddress,
|}

function TransactionsIndexView({
  setSearchQuery,
  transactions,
  digitalAssets,
  ownerAddress,
}: Props) {
  if (!ownerAddress) {
    return null
  }

  return (
    <div className='transactions-view'>
      <div className='header'>
        <div className='container'>
          <JTabs tabs={DIGITAL_ASSETS_TABS} />
          <div className='actions'>
            <div className='search'>
              <JSearch
                onQueryChange={setSearchQuery}
                placeholder='Search asset...'
              />
            </div>
            {/* <div className='filter'>
              <TransactionsFilter
                {...filter}
                filterCount={filterCount}
              />
            </div> */}
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
