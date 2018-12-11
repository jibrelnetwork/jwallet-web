// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import divDecimals from 'utils/numbers/divDecimals'

import {
  JIcon,
  JTabs,
  JSearch,
} from 'components/base'

import {
  TransactionsList,
  TransactionsFilter,
} from 'components'

// const BALANCE_DECIMAL_PLACES: number = 4

function getTransactionsTabs(asset: DigitalAsset, assetBalance: ?Balance) {
  const {
    name,
    symbol,
    decimals,
  }: DigitalAsset = asset

  const balance: string = assetBalance
    ? divDecimals(assetBalance.value, decimals)
    : '0'

  return {
    '/digital-assets': 'Digital assets',
    [`/transactions/${asset.address}`]: assetBalance ? `${name} — ${balance} ${symbol}` : name,
  }
}

type Props = {|
  +setIsOnlyPending: (boolean) => void,
  +changeSearchInput: (string) => void,
  +transactions: TransactionWithAssetAddress[],
  +params: {|
    +asset: string,
  |},
  +network: ?Network,
  +digitalAssets: DigitalAssets,
  +assetBalance: ?Balance,
  +searchQuery: string,
  +ownerAddress: ?OwnerAddress,
  +isLoading: boolean,
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
  assetBalance,
  ownerAddress,
  isLoading,
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

  return (
    <div className='transactions-view -asset'>
      <div className='header'>
        <div className='container'>
          <JTabs tabs={getTransactionsTabs(asset, assetBalance)} />
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
            <div className='send'>
              <JIcon
                size='medium'
                color='gray'
                name='upload'
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
            isLoading={isLoading}
            isFiltered={!!filterCount || !!searchQuery}
          />
        </Scrollbars>
      </div>
    </div>
  )
}

export default TransactionsAssetView
