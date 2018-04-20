// @flow

import { connect } from 'react-redux'
import { assoc, compose, filter, propEq } from 'ramda'

import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'
import { setActive, repeat } from 'routes/Transactions/modules/transactions'
import { getTransactionsByPeriod, searchTransactions } from 'utils/transactions'

import TransactionsList from '../../../components/TransactionsList'

const mapStateToProps = ({ networks, digitalAssets, transactions }: State): Object => compose(
  assoc(
    'transactionsByPeriod',
    compose(
      getTransactionsByPeriod,
      filter(propEq('type', 'receive')),
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList)
