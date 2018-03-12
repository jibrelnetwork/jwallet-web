// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import {
  open,
  close,
} from 'routes/Transactions/modules/transactions'

import TransactionsLayout from './TransactionsLayout'

const mapStateToProps = null

const mapDispatchToProps = {
  open,
  close,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(TransactionsLayout)
