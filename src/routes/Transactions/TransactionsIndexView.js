// @flow

import React from 'react'

import TransactionsList from 'components/TransactionsList'

type Props = {|
  +transactions: TransactionWithAssetAddress[],
  +digitalAssets: DigitalAssets,
|}

function TransactionsIndexView({
  transactions,
  digitalAssets,
}: Props) {
  return (
    <TransactionsList
      items={transactions}
      digitalAssets={digitalAssets}
    />
  )
}

export default TransactionsIndexView
