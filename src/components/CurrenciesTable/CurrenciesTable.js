import React from 'react'
import PropTypes from 'prop-types'

import JTable from 'components/base/JTable'

import CurrenciesTableSearch from './CurrenciesTableSearch'
import CurrenciesTableBodyRow from './CurrenciesTableBodyRow'

function CurrenciesTable(props) {
  const { toggleActiveCurrency, searchCurrencies, sortCurrencies, currencies } = props

  const {
    items,
    foundItemsSymbols,
    sortField,
    sortDirection,
    searchQuery,
    isActiveAll,
  } = currencies

  const isItemsFound = item => (foundItemsSymbols.indexOf(item.symbol) > -1)
  const foundItems = (searchQuery && searchQuery.length) ? items.filter(isItemsFound) : items
  const isChecked = isActiveAll

  const currenciesTableHeaderItems = [
    { title: 'Symbol', name: 'symbol', colWidth: 'col--2-4', isCheckable: true, isChecked },
    { title: 'Name', name: 'name', colWidth: 'col--3' },
    { title: 'Balance', name: 'balance', colWidth: 'col--2' },
    { title: 'Licensed', name: 'licensed', colWidth: 'col--2' },
    { title: 'Transfer', name: 'transfer', colWidth: 'col--2-4' },
  ]

  return (
    <JTable name='currencies'>
      <CurrenciesTableSearch
        searchCurrencies={searchCurrencies}
        searchQuery={searchQuery}
      />
      <JTable.Header
        items={currenciesTableHeaderItems}
        onClick={sortCurrencies}
        onToggle={toggleActiveCurrency(-1)}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <JTable.Body>
        {foundItems.map((currency, index) => {
          const { symbol, name, balanceFixed, licensed, transfer, isActive } = currency

          return (
            <CurrenciesTableBodyRow
              key={index}
              toggleActiveCurrency={toggleActiveCurrency}
              symbol={symbol}
              name={name}
              balanceFixed={balanceFixed}
              licensed={licensed}
              transfer={transfer}
              index={index}
              isActive={isActive}
            />
          )
        })}
      </JTable.Body>
    </JTable>
  )
}

CurrenciesTable.propTypes = {
  toggleActiveCurrency: PropTypes.func.isRequired,
  searchCurrencies: PropTypes.func.isRequired,
  sortCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      balanceFixed: PropTypes.string.isRequired,
      licensed: PropTypes.string.isRequired,
      transfer: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    })).isRequired,
    foundItemsSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default CurrenciesTable
