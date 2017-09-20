import React from 'react'
import PropTypes from 'prop-types'

import TransactionMain from './TransactionMain'
import TransactionDetails from './TransactionDetails'

function Transaction(props) {
  const {
    toggleActive,
    type,
    symbol,
    status,
    from,
    to,
    address,
    txHash,
    fee,
    date,
    amountFixed,
    isActive,
  } = props

  return (
    <div
      className={`transaction ${isActive ? 'transaction--active' : ''} table__item`}
      onClick={toggleActive}
    >
      <TransactionMain
        type={type}
        symbol={symbol}
        status={status}
        address={address}
        date={date}
        amountFixed={amountFixed}
        isActive={isActive}
      />
      <TransactionDetails
        from={from}
        to={to}
        txHash={txHash}
        fee={fee}
        isActive={isActive}
      />
    </div>
  )
}

Transaction.propTypes = {
  toggleActive: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  txHash: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amountFixed: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default Transaction
