// @flow

import { connect } from 'react-redux'
import { assoc, compose, filter, propEq } from 'ramda'

import { setActive, repeat } from 'routes/Transactions/modules/transactions'
import { getDigitalAssetByAddress, getTransactionsByPeriod, searchTransactions } from 'utils'

import OutgoingTransactions from '../components/OutgoingTransactions'

const mapStateToProps = ({ networks, digitalAssets, transactions }: State): Object => compose(
  assoc(
    'transactionsByPeriod',
    compose(
      getTransactionsByPeriod,
      filter(propEq('type', 'send')),
      searchTransactions,
    )(transactions),
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
