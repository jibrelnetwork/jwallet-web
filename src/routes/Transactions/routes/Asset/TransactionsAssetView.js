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

function getTransactionsTabs(asset: DigitalAsset, assetBalance: ?Balance, isFetched: boolean) {
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
    [`/transactions/${asset.address}`]: (isFetched && assetBalance)
      ? `${name} — ${balance} ${symbol}`
      : name,
  }
}

type Props = {|
  +setIsOnlyPending: (boolean) => void,
  +changeSearchInput: (string) => void,
  +transactions: TransactionWithPrimaryKeys[],
  +params: {|
    +asset: string,
  |},
  +network: ?Network,
  +addressNames: AddressNames,
  +digitalAssets: DigitalAssets,
  +assetBalance: ?Balance,
  +searchQuery: string,
  +ownerAddress: ?OwnerAddress,
  +isLoading: boolean,
  +isOnlyPending: boolean,
  +isCurrentBlockEmpty: boolean,
|}

function TransactionsAssetView({
  setIsOnlyPending,
  changeSearchInput,
  transactions,
  params,
  network,
  addressNames,
  digitalAssets,
  searchQuery,
  assetBalance,
  ownerAddress,
  isLoading,
  isOnlyPending,
  isCurrentBlockEmpty,
}: Props) {
  if (!(ownerAddress && network)) {
    return null
  }

  const asset: ?DigitalAsset = digitalAssets[params.asset]

  if (!asset) {
    return null
  }

  const filterCount: number = isOnlyPending ? 1 : 0
  const isBalanceAllowed: boolean = !isLoading || (!(!transactions.length || isCurrentBlockEmpty))

  return (
    <div className='transactions-view -asset'>
      <div className='header'>
        <div className='container'>
          <JTabs tabs={getTransactionsTabs(asset, assetBalance, isBalanceAllowed)} />
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
            addressNames={addressNames}
            digitalAssets={digitalAssets}
            assetAddress={params.asset}
            ownerAddress={ownerAddress}
            blockExplorerSubdomain={network.blockExplorerSubdomain}
            isFiltered={!!filterCount || !!searchQuery}
            isLoading={isLoading || isCurrentBlockEmpty}
          />
        </Scrollbars>
      </div>
    </div>
  )
}

export default TransactionsAssetView
