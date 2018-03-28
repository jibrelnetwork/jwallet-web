// @flow

import { connect } from 'react-redux'
import { assoc, compose } from 'ramda'

import { getDigitalAssetByAddress, getTransactionsByPeriod } from 'utils'
import { setActive, repeat } from 'routes/Transactions/modules/transactions'

import AllTransactions from '../components/AllTransactions'

const mapStateToProps = ({ networks, digitalAssets, transactions }: State): Object => compose(
  assoc(
    'transactionsByPeriod',
    getTransactionsByPeriod(transactions.items),
  ),
  assoc(
    'currentAsset',
    getDigitalAssetByAddress(digitalAssets.currentAddress, digitalAssets.items),
  ),
  assoc(
    'isCustomNetwork',
    (networks.currentNetwork && (networks.currentNetwork.indexOf('private') === 0)),
  ),
)(transactions)

const mapDispatchToProps = { setActive, repeat }

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions)
