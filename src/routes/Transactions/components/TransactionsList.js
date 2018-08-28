// @flow

import React from 'react'

import checkEthereumAsset from 'utils/digitalAssets/checkEthereumAsset'

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
  if (isCustomNetwork && currentAsset && checkEthereumAsset(currentAsset.address)) {
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

TransactionsList.defaultProps = {
  repeat: () => {},
  setActive: () => {},
  items: [],
  currentAsset: null,
  transactionsByPeriod: {},
  activeTxHash: null,
  isLoading: false,
  isCustomNetwork: false,
  isBlockExplorerError: false,
}

type Props = {
  repeat: Function,
  setActive: (txHash: Hash) => Dispatch,
  items: Transactions,
  currentAsset: ?DigitalAsset,
  transactionsByPeriod: Object,
  activeTxHash: ?Hash,
  isLoading: boolean,
  isCustomNetwork: boolean,
  isBlockExplorerError: boolean,
}

export default TransactionsList
