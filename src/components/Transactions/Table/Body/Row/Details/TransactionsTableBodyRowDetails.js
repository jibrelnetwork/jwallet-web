import React from 'react'
import PropTypes from 'prop-types'

function TransactionsTableBodyRowDetails(props) {
  const { from, to, transactionHash, fee, isActive, contractAddress } = props
  const _to = (to && to.length) ? to : `Contract creation (${contractAddress})`

  return (
    <div className={`transaction-details ${isActive ? 'transaction-details--active' : ''}`}>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{'Txhash'}</div>
        <div className='transaction-detail__value'>{transactionHash}</div>
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
        <div className='transaction-detail__value'>{_to}</div>
      </div>
    </div>
  )
}

TransactionsTableBodyRowDetails.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  transactionHash: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default TransactionsTableBodyRowDetails
