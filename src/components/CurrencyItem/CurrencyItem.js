import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function CurrencyItem(props) {
  const { symbol, name, balanceFixed, isAuthRequired, isLicensed, isCurrent } = props
  const setCurrentCurrency = isAuthRequired ? () => {} : props.setCurrentCurrency

  let currencyItemClassName = 'currency-item'

  if (isCurrent) {
    currencyItemClassName += ' currency-item--active'
  }

  if (isAuthRequired) {
    currencyItemClassName += ' currency-item--authorization'
  }

  return (
    <div className={currencyItemClassName} onClick={setCurrentCurrency}>
      <div className={`currency-item__image currency-item__image--${symbol.toLowerCase()}`} />
      <JIcon name={`currency-${symbol.toLowerCase()}`} className='currency-item__symbol' />
      <div className='currency-item__info'>
        <h3 className='currency-item__name'>{name}</h3>
        <div className='currency-item__balance'>
          {isAuthRequired ? 'Authorization required!' : `${balanceFixed} ${symbol}`}
        </div>
      </div>
      {isLicensed ? <JIcon name='licensed' className='currency-item__licensed' small /> : null}
    </div>
  )
}

CurrencyItem.propTypes = {
  setCurrentCurrency: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balanceFixed: PropTypes.string.isRequired,
  isAuthRequired: PropTypes.bool.isRequired,
  isLicensed: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
}

export default CurrencyItem
