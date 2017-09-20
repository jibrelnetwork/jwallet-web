import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function AccountItem(props) {
  const { symbol, name, balanceFixed, isAuthRequired, isLicensed, isCurrent } = props
  const setCurrentAccount = isAuthRequired ? () => {} : props.setCurrentAccount

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
      <JIcon name={`account-${symbol.toLowerCase()}`} className='account-item__symbol' />
      <div className='account-item__info'>
        <h3 className='account-item__name'>{name}</h3>
        <div className='account-item__balance'>
          {isAuthRequired ? 'Authorization required!' : `${balanceFixed} ${symbol}`}
        </div>
      </div>
      {isLicensed ? <JIcon name='licensed' className='account-item__licensed' small /> : null}
    </div>
  )
}

AccountItem.propTypes = {
  setCurrentAccount: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balanceFixed: PropTypes.string.isRequired,
  isAuthRequired: PropTypes.bool.isRequired,
  isLicensed: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
}

export default AccountItem
