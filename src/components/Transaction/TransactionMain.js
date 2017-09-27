import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function TransactionMain(props) {
  const {
    setCurrentAccount,
    toggleActive,
    type,
    symbol,
    status,
    address,
    amountFixed,
    date,
    accountIndex,
    isActive,
  } = props

  const isToken = (accountIndex !== -1)

  return (
    <div className='row clear' onClick={toggleActive}>
      <div className='transaction__item col-2-4'>
        <JIcon
          name={`small-${(status === 'Rejected') ? 'convert' : type}`}
          className='transaction__type'
          small
        />
        <span className='transaction__amount'>{`${amountFixed} ${symbol}`}</span>
      </div>
      <div className='transaction__item col-2-4'>{date}</div>
      <div
        className={`transaction__item ${isToken ? 'transaction__item--token' : ''} col-4-8`}
        onClick={isToken ? setCurrentAccount(accountIndex) : null}
      >
        {address}
      </div>
      <div className='transaction__item col-2-4'>
        <span className={`transaction__status transaction__status--${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      <JIcon
        name={'small-arrow'}
        className={`transaction__icon ${isActive ? 'transaction__icon--active' : ''}`}
        small
      />
    </div>
  )
}

TransactionMain.propTypes = {
  setCurrentAccount: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  amountFixed: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  accountIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default TransactionMain
