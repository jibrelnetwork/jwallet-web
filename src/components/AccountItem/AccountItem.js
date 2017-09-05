import React from 'react'
import PropTypes from 'prop-types'

import getTokenNameBySymbolName from 'utils/getTokenNameBySymbolName'

import JbIcon from 'components/base/JbIcon'

function AccountItem(props) {
  const { symbol, balance, isActive, isAuthRequired, isLicensed, isCurrent } = props
  const setCurrentAccount = isAuthRequired ? () => {} : props.setCurrentAccount

  if (!isActive) {
    return null
  }

  let accountItemClassName = 'account-item'

  if (isCurrent) {
    accountItemClassName += ' account-item--active'
  }

  if (isAuthRequired) {
    accountItemClassName += ' account-item--authorization'
  }

  return (
    <div className={accountItemClassName} onClick={setCurrentAccount}>
      <div className={`account-item__image account-item__image--${symbol.toLowerCase()}`} />
      <JbIcon name={`account-${symbol.toLowerCase()}`} className='account-item__symbol' />
      <div className='account-item__info'>
        <h3 className='account-item__name'>{getTokenNameBySymbolName(symbol)}</h3>
        <div className='account-item__balance'>
          {isAuthRequired ? 'Authorization required!' : `${balance} ${symbol}`}
        </div>
      </div>
      {isLicensed ? <JbIcon name='licensed' className='account-item__licensed' small /> : null}
    </div>
  )
}

AccountItem.propTypes = {
  setCurrentAccount: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isAuthRequired: PropTypes.bool.isRequired,
  isLicensed: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
}

export default AccountItem
