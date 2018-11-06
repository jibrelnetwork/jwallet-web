// @flow

import { connect } from 'react-redux'

import checkCustomNetwork from 'utils/networks/checkCustomNetwork'
import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'
import { repeat, setActive } from 'routes/Transactions/modules/transactions'
import { getTransactionsByPeriod, filterFoundTransactions } from 'utils/transactions'

import TransactionsList from '../../../components/TransactionsList'

function getOutgoingTransactions(transactions: Transactions) {
  return transactions.filter(({ type }: Transaction) => (type === 'send'))
}

function mapStateToProps({ networks, digitalAssets, transactions }: AppState): {
  items: Transactions,
  currentAsset: ?DigitalAsset,
  transactionsByPeriod: TransactionsByPeriod,
  activeTxHash: ?Hash,
  isLoading: boolean,
  isCustomNetwork: boolean,
  isBlockExplorerError: boolean,
} {
  const {
    items: digitalAssetsItems,
    currentAddress: assetAddress,
  }: DigitalAssetsData = digitalAssets

  const filteredTransactions: Transactions = filterFoundTransactions(transactions)
  const outgoingTransactions: Transactions = getOutgoingTransactions(filteredTransactions)

  return Object.assign({}, transactions, {
    isCustomNetwork: checkCustomNetwork(networks.currentNetwork),
    transactionsByPeriod: getTransactionsByPeriod(outgoingTransactions),
    currentAsset: getDigitalAssetByAddress(assetAddress, digitalAssetsItems),
  })
}

const mapDispatchToProps = {
  repeat,
  setActive,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList)
