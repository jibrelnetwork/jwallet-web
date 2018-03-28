// @flow

import { connect } from 'react-redux'
import { assoc, compose, propEq } from 'ramda'

import { getDigitalAssetByAddress, getTransactionsByPeriod } from 'utils'
import { setActive, repeat } from 'routes/Transactions/modules/transactions'

import OutgoingTransactions from '../components/OutgoingTransactions'

const mapStateToProps = ({ networks, digitalAssets, transactions }: State): Object => compose(
  assoc(
    'transactionsByPeriod',
    getTransactionsByPeriod(transactions.items.filter(propEq('type', 'send'))),
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

export default connect(mapStateToProps, mapDispatchToProps)(OutgoingTransactions)
