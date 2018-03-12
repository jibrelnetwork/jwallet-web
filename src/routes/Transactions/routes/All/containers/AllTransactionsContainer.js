// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import {
  open,
  close,
  setActive,
} from 'routes/Transactions/modules/transactions'

import AllTransactions from '../components/AllTransactions'

const mapStateToProps = ({ transactions }: State): TransactionsData => transactions

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
)(AllTransactions)
