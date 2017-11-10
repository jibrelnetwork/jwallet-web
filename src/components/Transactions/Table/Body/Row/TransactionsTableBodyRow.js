import React from 'react'
import PropTypes from 'prop-types'

import TransactionsTableBodyRowMain from './Main'
import TransactionsTableBodyRowDetails from './Details'

function TransactionsTableBodyRow(props) {
  const {
    setCurrentCurrency,
    toggleActive,
    type,
    status,
    from,
    to,
    address,
    transactionHash,
    date,
    currencySymbol,
    contractAddress,
    fee,
    amount,
    currencyIndex,
    isActive,
  } = props

  return (
    <div className={`transaction ${isActive ? 'transaction--active' : ''}`}>
      <TransactionsTableBodyRowMain
        setCurrentCurrency={setCurrentCurrency}
        toggleActive={toggleActive}
        type={type}
        status={status}
        address={address}
        contractAddress={contractAddress}
        amount={`${amount.toFixed(5)} ${currencySymbol}`}
        date={date}
        currencyIndex={currencyIndex}
        isActive={isActive}
      />
      <TransactionsTableBodyRowDetails
        from={from}
        to={to}
        transactionHash={transactionHash}
        fee={`${fee.toFixed(5)} ETH`}
        contractAddress={contractAddress}
        isActive={isActive}
      />
    </div>
  )
}

TransactionsTableBodyRow.propTypes = {
  setCurrentCurrency: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  transactionHash: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  fee: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  currencyIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default TransactionsTableBodyRow
