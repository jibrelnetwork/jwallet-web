// @flow

import React from 'react'

import isETH from 'utils/digitalAssets/isETH'

import TransactionsEmpty from './TransactionsEmpty'
import TransactionsByPeriod from './TransactionsByPeriod'

const TransactionsList = ({
  repeat,
  setActive,
  items,
  currentAsset,
  transactionsByPeriod,
  activeTxHash,
  isLoading,
  isCustomNetwork,
  isBlockExplorerError,
}: Props) => {
  if (isCustomNetwork && currentAsset && isETH(currentAsset.address)) {
    return <TransactionsEmpty event='private-node' />
  }

  if (isBlockExplorerError) {
    return <TransactionsEmpty event='be-error' />
  }

  if (isBlockExplorerError) {
    return <TransactionsEmpty event='no-active' />
  }

  return (
    <div className='transactions-list'>
      <TransactionsByPeriod
        repeat={repeat}
        setActive={setActive}
        transactionsByPeriod={transactionsByPeriod}
        activeTxHash={activeTxHash}
        assetSymbol={currentAsset ? currentAsset.symbol : null}
        isLoading={isLoading}
        isEmpty={!(items && items.length)}
      />
    </div>
  )
}

type Props = {
  repeat: Function,
  setActive: Function,
  items: Transactions,
  currentAsset: ?DigitalAsset,
  transactionsByPeriod: Object,
  activeTxHash: ?Hash,
  isLoading: boolean,
  isCustomNetwork: boolean,
  isBlockExplorerError: boolean,
}

export default TransactionsList
