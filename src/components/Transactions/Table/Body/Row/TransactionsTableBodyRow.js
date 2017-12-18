import React from 'react'
import PropTypes from 'prop-types'

import TransactionsTableBodyRowMain from './Main'
import TransactionsTableBodyRowDetails from './Details'

function TransactionsTableBodyRow(props) {
  const {
    setCurrentDigitalAssetAddress,
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
    isActive,
    isToken,
    isJNT,
  } = props

  return (
    <div className={`transaction ${isActive ? 'transaction--active' : ''}`}>
      <TransactionsTableBodyRowMain
        setCurrentDigitalAssetAddress={setCurrentDigitalAssetAddress}
        toggleActive={toggleActive}
        type={type}
        status={status}
        address={address}
        contractAddress={contractAddress}
        amount={`${amount.toFixed(5)} ${currencySymbol}`}
        date={date}
        isActive={isActive}
        isToken={isToken}
        isJNT={isJNT}
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
  setCurrentDigitalAssetAddress: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  transactionHash: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  fee: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isToken: PropTypes.bool.isRequired,
  /* optional */
  from: PropTypes.string,
  to: PropTypes.string,
  address: PropTypes.string,
  isJNT: PropTypes.bool,
}

TransactionsTableBodyRow.defaultProps = {
  from: null,
  to: null,
  address: null,
  isJNT: false,
}

export default TransactionsTableBodyRow
