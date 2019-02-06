// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { t } from 'ttag'

import {
  JTabs,
  JSearch,
} from 'components/base'

import {
  TransactionsList,
  TransactionsFilter,
} from 'components'

type Props = {|
  +removeFavorite: (Address) => void,
  +setIsOnlyPending: (boolean) => void,
  +changeSearchInput: (string) => void,
  +editComment: (CommentId, string) => void,
  +transactions: TransactionWithPrimaryKeys[],
  +network: ?Network,
  +comments: Comments,
  +favorites: AddressNames,
  +addressNames: AddressNames,
  +digitalAssets: DigitalAssets,
  +ownerAddress: ?OwnerAddress,
  +searchQuery: string,
  +isLoading: boolean,
  +isOnlyPending: boolean,
|}

const TRANSACTIONS_TABS = {
  '/digital-assets': t`Digital assets`,
  '/transactions': t`Transactions`,
}

function TransactionsIndexView({
  editComment,
  removeFavorite,
  setIsOnlyPending,
  changeSearchInput,
  transactions,
  network,
  comments,
  favorites,
  addressNames,
  digitalAssets,
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
      <div className='header'>
        <div className='container'>
          <JTabs tabs={TRANSACTIONS_TABS} />
          <div className='actions'>
            <div className='search'>
              <JSearch
                onChange={changeSearchInput}
                value={searchQuery}
                placeholder={t`Search transactions...`}
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
            editComment={editComment}
            removeFavorite={removeFavorite}
            items={transactions}
            comments={comments}
            favorites={favorites}
            addressNames={addressNames}
            digitalAssets={digitalAssets}
            ownerAddress={ownerAddress}
            blockExplorerUISubdomain={network.blockExplorerUISubdomain}
            isLoading={isLoading}
            isFiltered={!!filterCount || !!searchQuery}
          />
        </Scrollbars>
      </div>
    </div>
  )
}

export default TransactionsIndexView
