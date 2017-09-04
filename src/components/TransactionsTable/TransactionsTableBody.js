import React from 'react'
import PropTypes from 'prop-types'

import Transaction from 'components/Transaction'

function TransactionsTableBody({ transactions }) {
  return (
    <div className='transaction-table-body'>
      <div className='transaction-table-body__table'>
        <div className='transaction-table-body__item transaction-table-body__item--title'>
          <div className='row clear'>
            <div className='col-3'>{'Amount'}</div>
            <div className='col-3'>{'Time'}</div>
            <div className='col-3'>{'From/To'}</div>
            <div className='col-3'>{'Status'}</div>
          </div>
        </div>
      </div>
      {transactions.map((transactionProps, i) => <Transaction key={i} {...transactionProps} />)}
    </div>
  )
}

TransactionsTableBody.propTypes = {
  transactions: PropTypes.array.isRequired,
}

export default TransactionsTableBody
