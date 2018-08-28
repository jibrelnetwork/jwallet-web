// @flow

import { connect } from 'react-redux'

import checkCustomNetwork from 'utils/networks/checkCustomNetwork'
import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'
import { repeat, setActive } from 'routes/Transactions/modules/transactions'
import { getTransactionsByPeriod, filterFoundTransactions } from 'utils/transactions'

import TransactionsList from '../../../components/TransactionsList'

function mapStateToProps({ networks, digitalAssets, transactions }: State): {
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

  return Object.assign({}, transactions, {
    isCustomNetwork: checkCustomNetwork(networks.currentNetwork),
    transactionsByPeriod: getTransactionsByPeriod(filteredTransactions),
    currentAsset: getDigitalAssetByAddress(assetAddress, digitalAssetsItems),
  })
}

const mapDispatchToProps = {
  repeat,
  setActive,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList)
