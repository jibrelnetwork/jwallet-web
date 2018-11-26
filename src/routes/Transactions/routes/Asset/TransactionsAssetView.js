// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { JSearch, JText } from 'components/base'
import { TransactionsList, TransactionsFilter } from 'components'

type Props = {|
  +setIsOnlyPending: (boolean) => void,
  +changeSearchInput: (string) => void,
  +transactions: TransactionWithAssetAddress[],
  +digitalAssets: DigitalAssets,
  +params: {|
    +asset: string,
  |},
  +searchQuery: string,
  +assetAddress: string,
  +ownerAddress: ?OwnerAddress,
  +isOnlyPending: boolean,
|}

function TransactionsAssetView({
  setIsOnlyPending,
  changeSearchInput,
  transactions,
  digitalAssets,
  searchQuery,
  assetAddress,
  ownerAddress,
  isOnlyPending,
}: Props) {
  if (!ownerAddress) {
    return null
  }

  const filterCount: number = isOnlyPending ? 1 : 0

  return (
    <div className='transactions-view -asset'>
      <div className='header'>
        <div className='container'>
          <div className='title'>
            <JText value='Binance — 520,000 BNB' color='gray' size='tab' />
          </div>
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
            assetAddress={assetAddress}
            isFiltered={!!filterCount || !!searchQuery}
          />
        </Scrollbars>
      </div>
    </div>
  )
}

export default TransactionsAssetView
