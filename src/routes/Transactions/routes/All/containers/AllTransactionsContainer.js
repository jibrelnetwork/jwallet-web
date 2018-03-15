// @flow

import { connect } from 'react-redux'
import { assoc, compose } from 'ramda'

import { getDigitalAssetByAddress, getTransactionsByPeriod } from 'utils'
import { setActive } from 'routes/Transactions/modules/transactions'

import AllTransactions from '../components/AllTransactions'

const mapStateToProps = ({ digitalAssets, transactions }: State): Object => compose(
  assoc(
    'transactionsByPeriod',
    getTransactionsByPeriod(transactions.items),
  ),
  assoc(
    'currentAsset',
    getDigitalAssetByAddress(digitalAssets.currentAddress, digitalAssets.items),
  ),
)(transactions)

const mapDispatchToProps = { setActive }

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions)
