import React from 'react'
import PropTypes from 'prop-types'

import TransactionsTableBodyRowMain from './Main'
import TransactionsTableBodyRowDetails from './Details'

function TransactionsTableBodyRow(props) {
  const {
    setCurrentCurrency,
    toggleActive,
    type,
    symbol,
    status,
    from,
    to,
    address,
    txHash,
    fee,
    amountFixed,
    date,
    currencyIndex,
    isActive,
  } = props

  return (
    <div className={`transaction ${isActive ? 'transaction--active' : ''}`}>
      <TransactionsTableBodyRowMain
        setCurrentCurrency={setCurrentCurrency}
        toggleActive={toggleActive}
        type={type}
        symbol={symbol}
        status={status}
        address={address}
        amountFixed={amountFixed}
        date={date}
        currencyIndex={currencyIndex}
        isActive={isActive}
      />
      <TransactionsTableBodyRowDetails
        from={from}
        to={to}
        txHash={txHash}
        fee={fee}
        isActive={isActive}
      />
    </div>
  )
}

TransactionsTableBodyRow.propTypes = {
  setCurrentCurrency: PropTypes.func.isRequired,
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
  currencyIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default TransactionsTableBodyRow
