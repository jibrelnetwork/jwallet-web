// @flow

import { connect } from 'react-redux'

import flattenTransactionsByOwner from 'utils/transactions/flattenTransactionsByOwner'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'
import { selectTransactionsByOwner } from 'store/selectors/transactions'

import TransactionsIndexView from './TransactionsIndexView'

function mapStateToProps(state: AppState) {
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const owner: ?OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)

  const transactionsByOwner: ?TransactionsByOwner = owner
    ? selectTransactionsByOwner(state, networkId, owner)
    : null

  return {
    digitalAssets,
    transactions: transactionsByOwner ? flattenTransactionsByOwner(transactionsByOwner) : [],
  }
}

const mapDispatchToProps = {}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(TransactionsIndexView)
