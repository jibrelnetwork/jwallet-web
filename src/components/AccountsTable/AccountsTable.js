import React from 'react'
import PropTypes from 'prop-types'

import JbTable from 'components/base/JbTable'

import AccountsTableHeader from './AccountsTableHeader'
import AccountsTableBody from './AccountsTableBody'

class AccountsTable extends JbTable {
  render() {
    const { items, sortField, sortDirection, searchQuery } = this.state
    const { toggleAccount, isActiveAll } = this.props

    console.log('AccountsTable', items[1].symbol)

    return (
      <div className='accounts-table'>
        <AccountsTableHeader
          searchAccounts={this.searchItems}
          searchQuery={searchQuery}
        />
        <AccountsTableBody
          sortAccounts={this.sortItems}
          toggleAccount={toggleAccount}
          items={items}
          sortField={sortField}
          sortDirection={sortDirection}
          isActiveAll={isActiveAll}
        />
      </div>
    )
  }
}

AccountsTable.propTypes = {
  toggleAccount: PropTypes.func.isRequired,
  syncItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAuthRequired: PropTypes.bool.isRequired,
    isLicensed: PropTypes.bool.isRequired,
  })).isRequired,
  sortField: PropTypes.string.isRequired,
  isActiveAll: PropTypes.bool.isRequired,
  sortDirection: PropTypes.string,
  searchQuery: PropTypes.string,
}

AccountsTable.defaultProps = {
  sortDirection: 'ASC',
  searchQuery: '',
}

export default AccountsTable
