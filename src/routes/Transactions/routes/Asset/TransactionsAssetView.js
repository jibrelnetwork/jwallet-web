// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { JSearch, JText } from 'components/base'
import { TransactionsList, TransactionsFilter } from 'components'

type Props = {|
  +setIsOnlyPending: (boolean) => void,
  +changeSearchInput: (string) => void,
  +transactions: TransactionWithAssetAddress[],
  +params: {|
    +asset: string,
  |},
  +network: ?Network,
  +digitalAssets: DigitalAssets,
  +searchQuery: string,
  +ownerAddress: ?OwnerAddress,
  +isOnlyPending: boolean,
|}

function TransactionsAssetView({
  setIsOnlyPending,
  changeSearchInput,
  transactions,
  params,
  network,
  digitalAssets,
  searchQuery,
  ownerAddress,
  isOnlyPending,
}: Props) {
  if (!(ownerAddress && network)) {
    return null
  }

  const asset: ?DigitalAsset = digitalAssets[params.asset]

  if (!asset) {
    return null
  }

  const filterCount: number = isOnlyPending ? 1 : 0

  const {
    name,
    symbol,
  }: DigitalAsset = asset

  return (
    <div className='transactions-view -asset'>
      <div className='header'>
        <div className='container'>
          <div className='title'>
            <JText value={`${name} — 39,76 ${symbol}`} color='gray' size='tab' />
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
            assetAddress={params.asset}
            ownerAddress={ownerAddress}
            blockExplorerSubdomain={network.blockExplorerSubdomain}
            isFiltered={!!filterCount || !!searchQuery}
          />
        </Scrollbars>
      </div>
    </div>
  )
}

export default TransactionsAssetView
