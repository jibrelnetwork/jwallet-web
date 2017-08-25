import React from 'react'
import PropTypes from 'prop-types'

import JbIcon from 'components/base/JbIcon'

const symbolNameMap = {
  ETH: 'Ethereum',
  jUSD: 'United Stated dollar',
  jEUR: 'Euro',
  jGBP: 'Pound sterling',
  jAED: 'UAE dirham',
  jCNY: 'Chinese yuan',
  jRUB: 'Russian ruble',
  JNT: 'Jibrel Network Token',
}

function JbAccountItem({ symbol, balance, isActive, isAuthRequired, isLicensed }) {
  let accountItemClassName = 'account-item'

  if (isActive) {
    accountItemClassName += ' account-item--active'
  }

  if (isAuthRequired) {
    accountItemClassName += ' account-item--authorization'
  }

  return (
    <div className={accountItemClassName}>
      <div className={`account-item__image account-item__image--${symbol.toLowerCase()}`} />
      <JbIcon name={`account-${symbol.toLowerCase()}`} className='account-item__symbol' />
      <div className='account-item__info'>
        <h3 className='account-item__name'>{symbolNameMap[symbol]}</h3>
        <div className='account-item__balance'>
          {isAuthRequired ? 'Authorization required!' : `${balance || '0.000'} ${symbol}`}
        </div>
      </div>
      {isLicensed ? <JbIcon name='licensed' className='account-item__licensed' small /> : null}
    </div>
  )
}

JbAccountItem.propTypes = {
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.string,
  isActive: PropTypes.bool,
  isAuthRequired: PropTypes.bool,
  isLicensed: PropTypes.bool,
}

export default JbAccountItem
