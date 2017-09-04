import React from 'react'
import PropTypes from 'prop-types'

import getFormattedDateString from 'utils/getFormattedDateString'

import JbIcon from 'components/base/JbIcon'

function TransactionMain({ type, amount, symbol, timestamp, status, from, to, isActive }) {
  const dateString = getFormattedDateString(new Date(timestamp), 'hh:mm MM/DD/YYYY')

  return (
    <div className='row clear'>
      <div className='col-3'>
        <JbIcon
          name={`small-${(status === 'Rejected') ? 'convert' : type}`}
          className='transaction__type'
          small
        />
        <span className='transaction__amount'>{`${amount} ${symbol}`}</span>
      </div>
      <div className='col-3'>{dateString}</div>
      <div className='col-3 transaction__address'>{(type === 'receive') ? from : to}</div>
      <div className='col-3'>
        <span className={`transaction__status transaction__status--${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      <JbIcon
        name={'small-arrow'}
        className={`transaction__icon ${isActive ? 'transaction__icon--active' : ''}`}
        small
      />
    </div>
  )
}

TransactionMain.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
}

TransactionMain.defaultProps = {
  isActive: false,
}

export default TransactionMain
