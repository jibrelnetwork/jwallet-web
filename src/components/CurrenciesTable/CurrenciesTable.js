import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { Scrollbars } from 'react-custom-scrollbars'

import JTable from 'components/base/JTable'

import CurrenciesTableSearch from './CurrenciesTableSearch'
import CurrenciesTableBodyRow from './CurrenciesTableBodyRow'
import CurrenciesTableEmpty from './Empty'

function CurrenciesTable(props) {
  const {
    toggleActive,
    searchCurrencies,
    sortCurrencies,
    items,
    foundItemsSymbols,
    balances,
    sortField,
    sortDirection,
    searchQuery,
    isActiveAll,
  } = props

  const field = i18n('modals.digitalAssetManager.table.field') || {}
  const isItemsFound = item => (foundItemsSymbols.indexOf(item.symbol) > -1)
  const foundItems = (searchQuery && searchQuery.length) ? items.filter(isItemsFound) : items
  const isChecked = isActiveAll

  const currenciesTableHeaderItems = [
    { name: 'symbol', colWidth: 'col--2-4', isCheckable: true, isChecked },
    { name: 'name', colWidth: 'col--3' },
    { name: 'balance', colWidth: 'col--2', isReadOnly: true },
    { name: 'licensed', colWidth: 'col--2', isReadOnly: true },
    { name: 'transfer', colWidth: 'col--2-4', isReadOnly: true },
  ].map(item => ({ ...item, title: field[item.name] }))

  const currenciesTableBody = isEmpty(foundItems)
    ? <CurrenciesTableEmpty />
    : <Scrollbars autoHide>
      {foundItems.map((currency, index) => {
        const { address, symbol, name, isAuthRequired, isLicensed, isActive } = currency
        const balanceFixed = (balances[symbol] || 0).toFixed(3)

        return (
          <CurrenciesTableBodyRow
            key={index}
            onToggle={toggleActive(address)}
            symbol={symbol}
            name={name}
            balanceFixed={balanceFixed}
            index={index}
            isAuthRequired={isAuthRequired}
            isLicensed={isLicensed}
            isActive={isActive}
          />
        )
      })}
    </Scrollbars>

  return (
    <JTable name='currencies'>
      <CurrenciesTableSearch
        searchCurrencies={searchCurrencies}
        searchQuery={searchQuery}
      />
      <JTable.Header
        items={currenciesTableHeaderItems}
        onClick={sortCurrencies}
        onToggle={toggleActive(null)}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <JTable.Body>{currenciesTableBody}</JTable.Body>
    </JTable>
  )
}

CurrenciesTable.propTypes = {
  toggleActive: PropTypes.func.isRequired,
  searchCurrencies: PropTypes.func.isRequired,
  sortCurrencies: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isAuthRequired: PropTypes.bool.isRequired,
    isLicensed: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
  })).isRequired,
  foundItemsSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  isActiveAll: PropTypes.bool.isRequired,
  balances: PropTypes.shape(),
}

CurrenciesTable.defaultProps = {
  balances: {},
}

export default CurrenciesTable
