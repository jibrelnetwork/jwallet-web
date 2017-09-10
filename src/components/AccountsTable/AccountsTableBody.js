import React from 'react'
import PropTypes from 'prop-types'

import getTokenNameBySymbolName from 'utils/getTokenNameBySymbolName'

import { JbCheckbox, JbIcon } from 'components/base'

function AccountsTableBody({ sortAccounts, toggleAccount, accounts }) {
  const { items, foundItemsSymbols, sortField, sortDirection, isActiveAll } = accounts
  const iconClassName = 'pull-left table__icon table__icon--'
  const isDesc = (sortDirection === 'DESC')

  const isItemsFound = item => (foundItemsSymbols.indexOf(item.symbol) > -1)

  const foundItems = (foundItemsSymbols && foundItemsSymbols.length)
    ? items.filter(isItemsFound)
    : items

  return (
    <div className='account-table-body'>
      <div className='accounts-table__item table__item table__item--title'>
        <div className='row clear'>
          <div className='table__title-item col-1-5 clear' onClick={sortAccounts('symbol')}>
            <JbCheckbox toggle={toggleAccount(-1)} isActive={isActiveAll} />
            <span className='accounts-table__symbol pull-left'>{'Symbol'}</span>
            <JbIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'symbol')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'symbol') ? 'active' : ''}`}
            />
          </div>
          <div className='table__title-item col-3 clear' onClick={sortAccounts('name')}>
            <span className='pull-left'>{'Name'}</span>
            <JbIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'name')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'name') ? 'active' : ''}`}
            />
          </div>
          <div className='table__title-item col-2 clear' onClick={sortAccounts('balance')}>
            <span className='pull-left'>{'Balance'}</span>
            <JbIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'balance')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'balance') ? 'active' : ''}`}
            />
          </div>
          <div className='table__title-item col-2 clear' onClick={sortAccounts('isLicensed')}>
            <span className='pull-left'>{'Licenced'}</span>
            <JbIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'isLicensed')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'isLicensed') ? 'active' : ''}`}
            />
          </div>
          <div className='table__title-item col-1-5 clear' onClick={sortAccounts('isAuthRequired')}>
            <span className='pull-left'>{'Transfer'}</span>
            <JbIcon
              small
              name={`small-arrow${(isDesc && (sortField === 'isAuthRequired')) ? '' : '-up'}`}
              className={`${iconClassName}${(sortField === 'isAuthRequired') ? 'active' : ''}`}
            />
          </div>
        </div>
      </div>
      <div className='scroll'>
        {foundItems.map((account, index) => {
          const { symbol, balance, isLicensed, isAuthRequired, isActive } = account
          const tokenName = getTokenNameBySymbolName(symbol)
          const licensed = isLicensed ? 'Yes' : 'No'
          const transfer = isAuthRequired ? 'Not Authorized' : 'Authorized'

          return (
            <div
              className='accounts-table__item table__item'
              key={index}
              onClick={toggleAccount(index)(!isActive)}
            >
              <div className='row clear'>
                <div className='accounts-table__field col-1-5'>
                  <JbCheckbox
                    toggle={toggleAccount(index)}
                    isActive={isActive}
                    label={symbol}
                  />
                </div>
                <div className='accounts-table__field col-3'>{tokenName}</div>
                <div className='accounts-table__field col-2'>{balance.toFixed(3)}</div>
                <div className='accounts-table__field col-2'>{licensed}</div>
                <div className='accounts-table__field col-1-5'>{transfer}</div>
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
      balance: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    foundItemsSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AccountsTableBody
