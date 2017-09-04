import React from 'react'
import PropTypes from 'prop-types'

import getTokenNameBySymbolName from 'utils/getTokenNameBySymbolName'

import JbCheckbox from 'components/base/JbCheckbox'

function AccountManagerBody({ toggleAccount, accounts }) {
  const { items, isActiveAll } = accounts

  return (
    <div className='account-manager-body'>
      <div className='account-manager__table'>
        <div className='account-manager__item account-manager__item--title'>
          <div className='row clear'>
            <div className='account-manager__field col-2'>
              <JbCheckbox toggle={toggleAccount(-1)} isActive={isActiveAll} label={'Symbol'} />
            </div>
            <div className='account-manager__field col-3'>{'Name'}</div>
            <div className='account-manager__field col-2'>{'Balance'}</div>
            <div className='account-manager__field col-2'>{'Licenced'}</div>
            <div className='account-manager__field col-3'>{'Transfer'}</div>
          </div>
        </div>
        <div className='scroll'>
          {items.map((account, index) => {
            const { symbol, balance, isLicensed, isAuthRequired, isActive } = account
            const tokenName = getTokenNameBySymbolName(symbol)
            const licensed = isLicensed ? 'Yes' : 'No'
            const transfer = isAuthRequired ? 'Not Authorized' : 'Authorized'

            return (
              <div
                className='account-manager__item'
                key={index}
                onClick={toggleAccount(index)(!isActive)}
              >
                <div className='row clear'>
                  <div className='account-manager__field col-2'>
                    <JbCheckbox
                      toggle={toggleAccount(index)}
                      isActive={isActive}
                      label={symbol}
                    />
                  </div>
                  <div className='account-manager__field col-3'>{tokenName}</div>
                  <div className='account-manager__field col-2'>{balance}</div>
                  <div className='account-manager__field col-2'>{licensed}</div>
                  <div className='account-manager__field col-3'>{transfer}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

AccountManagerBody.propTypes = {
  toggleAccount: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    current: PropTypes.number.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AccountManagerBody
