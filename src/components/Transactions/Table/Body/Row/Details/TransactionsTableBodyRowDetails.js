import React from 'react'
import PropTypes from 'prop-types'

function TransactionsTableBodyRowDetails(props) {
  const { from, to, txHash, fee, isActive } = props

  return (
    <div className={`transaction-details ${isActive ? 'transaction-details--active' : ''}`}>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{'Txhash'}</div>
        <div className='transaction-detail__value'>{txHash}</div>
      </div>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{'Fee'}</div>
        <div className='transaction-detail__value'>{fee}</div>
      </div>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{'From'}</div>
        <div className='transaction-detail__value'>{from}</div>
      </div>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{'To'}</div>
        <div className='transaction-detail__value'>{to}</div>
      </div>
    </div>
  )
}

TransactionsTableBodyRowDetails.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  txHash: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default TransactionsTableBodyRowDetails
