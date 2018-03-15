// @flow

import { connect } from 'react-redux'
import { assoc, compose, propEq } from 'ramda'

import { getDigitalAssetByAddress, getTransactionsByPeriod } from 'utils'
import { setActive } from 'routes/Transactions/modules/transactions'

import IncomingTransactions from '../components/IncomingTransactions'

const mapStateToProps = ({ digitalAssets, transactions }: State): Object => compose(
  assoc(
    'transactionsByPeriod',
    getTransactionsByPeriod(transactions.items.filter(propEq('type', 'receive'))),
  ),
  assoc(
    'currentAsset',
    getDigitalAssetByAddress(digitalAssets.currentAddress, digitalAssets.items),
  ),
)(transactions)

const mapDispatchToProps = { setActive }

export default connect(mapStateToProps, mapDispatchToProps)(IncomingTransactions)
