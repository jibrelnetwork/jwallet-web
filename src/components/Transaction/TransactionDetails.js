import React from 'react'
import PropTypes from 'prop-types'

function TransactionDetails({ txHash, fee, from, to, isActive }) {
  return (
    <div className={`transaction__details ${isActive ? 'transaction__details--active' : ''}`}>
      <div className='transaction__detail'>
        <div className='title'>{'Txhash'}</div><div className='value'>{txHash}</div>
      </div>
      <div className='transaction__detail'>
        <div className='title'>{'Fee'}</div><div className='value'>{fee}</div>
      </div>
      <div className='transaction__detail'>
        <div className='title'>{'From'}</div><div className='value'>{from}</div>
      </div>
      <div className='transaction__detail'>
        <div className='title'>{'To'}</div><div className='value'>{to}</div>
      </div>
    </div>
  )
}

TransactionDetails.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  txHash: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
}

export default TransactionDetails
