import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import i18n from 'i18n/en'

const { detailsField } = i18n.transactions.table

function TransactionsTableBodyRowDetails(props) {
  const { from, to, transactionHash, fee, isActive, contractAddress } = props
  const _to = isEmpty(to) ? `Contract creation (${contractAddress})` : to

  return (
    <div className={`transaction-details ${isActive ? 'transaction-details--active' : ''}`}>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{detailsField.txHash}</div>
        <div className='transaction-detail__value'>{transactionHash}</div>
      </div>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{detailsField.fee}</div>
        <div className='transaction-detail__value'>{fee}</div>
      </div>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{detailsField.from}</div>
        <div className='transaction-detail__value'>{from}</div>
      </div>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>{detailsField.to}</div>
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
