import React from 'react'
import PropTypes from 'prop-types'

import JbCheckbox from 'components/base/JbCheckbox'

function AccountManagerBody({ toggleAccount, accounts, isActiveAll }) {
  return (
    <div className='account-manager-body'>
      <div className='account-manager__table'>
        <div className='account-manager__item account-manager__item--title'>
          <div className='row clear'>
            <div className='col-1-5'>
              <JbCheckbox toggle={toggleAccount(-1)} isActive={isActiveAll} label={'Symbol'} />
            </div>
            <div className='col-1-5'>{'Name'}</div>
            <div className='col-1-5'>{'Balance'}</div>
            <div className='col-1-5'>{'Licenced'}</div>
            <div className='col-1-5'>{'Transfer'}</div>
          </div>
        </div>
        <div className='scroll'>
          {accounts.map((account, index) => {
            const { label, name, balance, licensed, transfer, isActive } = account

            return (
              <div className='account-manager__item' key={index}>
                <div className='row clear'>
                  <div className='col-1-5'>
                    <JbCheckbox
                      toggle={toggleAccount(index)}
                      isActive={isActive}
                      label={label}
                    />
                  </div>
                  <div className='col-1-5'>{name}</div>
                  <div className='col-1-5'>{balance}</div>
                  <div className='col-1-5'>{licensed}</div>
                  <div className='col-1-5'>{transfer}</div>
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
  accounts: PropTypes.array.isRequired,
  isActiveAll: PropTypes.bool,
}

export default AccountManagerBody
