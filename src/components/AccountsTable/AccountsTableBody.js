import React from 'react'
import PropTypes from 'prop-types'

import { JCheckbox, JIcon } from 'components/base'

function AccountsTableBody({ sortAccounts, toggleAccount, accounts }) {
  const { items, foundItemsSymbols, sortField, sortDirection, searchQuery, isActiveAll } = accounts
  const iconClassName = 'pull-left table__icon table__icon--'
  const isDesc = (sortDirection === 'DESC')

  const isItemsFound = item => (foundItemsSymbols.indexOf(item.symbol) > -1)
  const foundItems = (searchQuery && searchQuery.length) ? items.filter(isItemsFound) : items

  return (
    <div className='accounts-table-body'>
      <div className='accounts-table__item table__item table__item--title'>
        <div className='row clear'>
          <div className='table__title-item col-2-4 clear' onClick={sortAccounts('symbol')}>
            <JCheckbox toggle={toggleAccount(-1)} isActive={isActiveAll} />
            <span className='accounts-table__symbol pull-left'>{'Symbol'}</span>
            <JIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'symbol')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'symbol') ? 'active' : ''}`}
            />
          </div>
          <div className='table__title-item col-3 clear' onClick={sortAccounts('name')}>
            <span className='pull-left'>{'Name'}</span>
            <JIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'name')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'name') ? 'active' : ''}`}
            />
          </div>
          <div
            className='table__title-item table__title-item--balance col-2 clear'
            onClick={sortAccounts('balance')}
          >
            <span className='pull-left'>{'Balance'}</span>
            <JIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'balance')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'balance') ? 'active' : ''}`}
            />
          </div>
          <div
            className='table__title-item table__title-item--licensed col-2 clear'
            onClick={sortAccounts('licensed')}
          >
            <span className='pull-left'>{'Licenced'}</span>
            <JIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'licensed')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'licensed') ? 'active' : ''}`}
            />
          </div>
          <div
            className='table__title-item table__title-item--transfer col-2-4 clear'
            onClick={sortAccounts('transfer')}
          >
            <span className='pull-left'>{'Transfer'}</span>
            <JIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'transfer')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'transfer') ? 'active' : ''}`}
            />
          </div>
        </div>
      </div>
      <div className='scroll'>
        {foundItems.map((account, index) => {
          const { symbol, name, balanceFixed, licensed, transfer, isActive } = account

          return (
            <div
              className='accounts-table__item table__item'
              key={index}
              onClick={toggleAccount(index)(!isActive)}
            >
              <div className='row clear'>
                <div className='accounts-table__field col-2-4'>
                  <JCheckbox
                    toggle={toggleAccount(index)}
                    isActive={isActive}
                    label={symbol}
                  />
                </div>
                <div className='accounts-table__field col-3'>{name}</div>
                <div className='accounts-table__field accounts-table__field--balance col-2'>
                  {balanceFixed}
                </div>
                <div className='accounts-table__field accounts-table__field--licensed col-2'>
                  {licensed}
                </div>
                <div className='accounts-table__field accounts-table__field--transfer col-2-4'>
                  {transfer}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

AccountsTableBody.propTypes = {
  sortAccounts: PropTypes.func.isRequired,
  toggleAccount: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
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

export default AccountsTableBody
