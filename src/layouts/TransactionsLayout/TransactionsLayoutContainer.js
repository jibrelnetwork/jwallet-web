// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { open, close, search } from 'routes/Transactions/modules/transactions'

import TransactionsLayout from './TransactionsLayout'

const mapStateToProps: Function = ({ transactions }: State): {
  searchQuery: string,
} => ({
  searchQuery: transactions.searchQuery,
})

const mapDispatchToProps = { open, close, search }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(TransactionsLayout)
