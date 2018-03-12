// @flow

import lifecycle from 'recompose/lifecycle'
import { connect } from 'react-redux'
import { assoc, compose, propEq } from 'ramda'

import {
  open,
  close,
  setActive,
} from 'routes/Transactions/modules/transactions'

import IncomingTransactions from '../components/IncomingTransactions'

const mapStateToProps = ({ transactions }: State): TransactionsData => assoc(
  'items',
  transactions.items.filter(propEq('type', 'receive')),
)(transactions)

const mapDispatchToProps = {
  open,
  close,
  setActive,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(IncomingTransactions)

