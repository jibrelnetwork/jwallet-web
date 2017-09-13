import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function TransactionMain({ type, symbol, status, address, amountFixed, date, isActive }) {
  return (
    <div className='row clear'>
      <div className='col-3'>
        <JIcon
          name={`small-${(status === 'Rejected') ? 'convert' : type}`}
          className='transaction__type'
          small
        />
        <span className='transaction__amount'>{`${amountFixed} ${symbol}`}</span>
      </div>
      <div className='col-3'>{date}</div>
      <div className='col-3 transaction__address'>{address}</div>
      <div className='col-3'>
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
  type: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  amountFixed: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default TransactionMain
