import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import classNames from 'classnames'

function TransactionsTableBodyRowDetails({
  from,
  to,
  transactionHash,
  fee,
  isActive,
  contractAddress,
}) {
  return (
    <div className={classNames('transaction-details', { 'transaction-details--active': isActive })}>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>
          {i18n('transactions.table.detailsField.txHash')}
        </div>
        <div className='transaction-detail__value'>{transactionHash}</div>
      </div>
      <div className='transaction-detail'>
        <div className='transaction-detail__title'>
          {i18n('transactions.table.detailsField.fee')}
        </div>
        <div className='transaction-detail__value'>{fee}</div>
      </div>
      {from && (
        <div className='transaction-detail'>
          <div className='transaction-detail__title'>
            {i18n('transactions.table.detailsField.from')}
          </div>
          <div className='transaction-detail__value'>{from}</div>
        </div>
      )}
      {(to || contractAddress) && (
        <div className='transaction-detail'>
          <div className='transaction-detail__title'>
            {i18n('transactions.table.detailsField.to')}
          </div>
          <div className='transaction-detail__value'>
            {contractAddress ? `Contract creation (${contractAddress})` : to}
          </div>
        </div>
      )}
    </div>
  )
}

TransactionsTableBodyRowDetails.propTypes = {
  transactionHash: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  /* optional */
  from: PropTypes.string,
  to: PropTypes.string,
}

TransactionsTableBodyRowDetails.defaultProps = {
  from: null,
  to: null,
}

export default TransactionsTableBodyRowDetails
