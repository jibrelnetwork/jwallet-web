// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { t } from 'ttag'

import handle from 'utils/eventHandlers/handle'
import { formatAssetBalance } from 'utils/formatters'

import {
  JTabs, JFlatButton, SearchInput,
} from 'components/base'

import {
  TransactionsList,
  TransactionsFilter,
} from 'components'

function getTransactionsTabs(asset: DigitalAsset, assetBalance: ?Balance, isFetched: boolean) {
  const {
    name,
    symbol,
    blockchainParams: {
      address,
      decimals,
    },
  }: DigitalAsset = asset

  const balance: string = formatAssetBalance(
    address,
    assetBalance ? assetBalance.value : 0,
    decimals,
  )

  return {
    '/assets': t`Digital Assets`,
    [`/history/${address}`]: (isFetched && assetBalance)
      ? `${name} — ${balance} ${symbol}`
      : name,
  }
}

type Props = {|
  +removeFavorite: (Address) => void,
  +setIsOnlyPending: (boolean) => void,
  +changeSearchInput: (string) => void,
  +editComment: (CommentId, string) => void,
  +removeItemsByAsset: (AssetAddress) => void,
  +transactions: TransactionWithPrimaryKeys[],
  +params: {|
    +asset: string,
  |},
  +network: ?Network,
  +comments: Comments,
  +favorites: AddressNames,
  +addressNames: AddressNames,
  +digitalAssets: DigitalAssets,
  +assetBalance: ?Balance,
  +searchQuery: string,
  +assetAddress: AssetAddress,
  +ownerAddress: ?OwnerAddress,
  +isLoading: boolean,
  +isOnlyPending: boolean,
  +isCurrentBlockEmpty: boolean,
|}

function TransactionsAssetView({
  editComment,
  removeFavorite,
  setIsOnlyPending,
  changeSearchInput,
  removeItemsByAsset,
  transactions,
  params,
  network,
  comments,
  favorites,
  addressNames,
  digitalAssets,
  searchQuery,
  assetBalance,
  assetAddress,
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
  const isLoadingOrBlockEmpty: boolean = isLoading || isCurrentBlockEmpty
  const isBalanceAllowed: boolean = !isLoading || (!(!transactions.length || isCurrentBlockEmpty))

  return (
    <div className='transactions-view -asset'>
      <div className='header'>
        <div className='container'>
          <JTabs tabs={getTransactionsTabs(asset, assetBalance, isBalanceAllowed)} />
          <div className='actions'>
            <div className='search'>
              <SearchInput
                onChange={changeSearchInput}
                value={searchQuery}
              />
            </div>
            <div className='filter'>
              <TransactionsFilter
                setOnlyPending={setIsOnlyPending}
                filterCount={filterCount}
                isOnlyPending={isOnlyPending}
              />
            </div>
            <div className='send' title={t`Send asset`}>
              <JFlatButton
                to={`/send?asset=${asset.blockchainParams.address}`}
                iconColor='gray'
                iconName='upload'
              />
            </div>
            <div className='refetch' title='Resync'>
              <JFlatButton
                onClick={handle(removeItemsByAsset)(assetAddress)}
                iconColor='gray'
                iconName='reload'
                isDisabled={isLoadingOrBlockEmpty}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='content'>
        <Scrollbars autoHide>
          <TransactionsList
            editComment={editComment}
            removeFavorite={removeFavorite}
            items={transactions}
            comments={comments}
            favorites={favorites}
            addressNames={addressNames}
            digitalAssets={digitalAssets}
            assetAddress={params.asset}
            ownerAddress={ownerAddress}
            blockExplorerUISubdomain={network.blockExplorerUISubdomain}
            isFiltered={!!filterCount || !!searchQuery}
            isLoading={isLoadingOrBlockEmpty}
          />
        </Scrollbars>
      </div>
    </div>
  )
}

export default TransactionsAssetView
