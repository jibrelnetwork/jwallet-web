import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import TransactionsTableBodyRow from './Row'

function TransactionsTableBody(props) {
  const {
    setCurrentDigitalAssetAddress,
    toggleActive,
    isToken,
    transactions,
    currencySymbol,
    activeTransactionIndex,
    isMobile,
  } = props

  const transactionItems = transactions.map((transactionProps, i) => {
    return (
      <TransactionsTableBodyRow
        key={i}
        {...transactionProps}
        setCurrentDigitalAssetAddress={setCurrentDigitalAssetAddress}
        toggleActive={toggleActive(i)}
        currencySymbol={currencySymbol}
        isActive={activeTransactionIndex === i}
        isToken={isToken(transactionProps.contractAddress)}
      />
    )
  })

  return (
    <div className='transactions-table-body'>
      {isMobile ? transactionItems : <Scrollbars autoHide>{transactionItems}</Scrollbars>}
    </div>
  )
}

TransactionsTableBody.propTypes = {
  setCurrentDigitalAssetAddress: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  isToken: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    transactionHash: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    contractAddress: PropTypes.string.isRequired,
    fee: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
  })).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  activeTransactionIndex: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

export default TransactionsTableBody
