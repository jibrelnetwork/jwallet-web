// @flow

import { connect } from 'react-redux'

import TransactionsActions from '../components/TransactionsActions'
import { search } from '../modules/transactions'

const mapStateToProps = ({ transactions }: State): {
  searchQuery: string,
} => ({
  searchQuery: transactions.searchQuery,
})

const mapDispatchToProps = {
  search,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsActions)
