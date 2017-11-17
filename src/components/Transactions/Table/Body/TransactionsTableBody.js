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
  } = props

  const { filterData, items, foundItemsHashes, searchQuery } = transactions
  const isItemsFound = item => (foundItemsHashes.indexOf(item.txHash) > -1)
  const isSearching = (searchQuery && searchQuery.length)
  const foundItems = isSearching ? items.filter(isItemsFound) : items

  const { startTime, endTime, isOpen } = filterData

  const isStartTime = (isOpen && (startTime !== 0))
  const isEndTime = (isOpen && (endTime !== 0))

  return (
    <div className='transactions-table-body'>
      <Scrollbars autoHide>
        {foundItems.map((transactionProps, i) => {
          const { timestamp, contractAddress } = transactionProps
          const isAfterStartTime = isStartTime ? (timestamp > startTime) : true
          const isBeforeEndTime = isEndTime ? (timestamp < endTime) : true
          const isActive = (activeTransactionIndex === i)

          if (isAfterStartTime && isBeforeEndTime) {
            return (
              <TransactionsTableBodyRow
                key={i}
                {...transactionProps}
                setCurrentDigitalAssetAddress={setCurrentDigitalAssetAddress}
                toggleActive={toggleActive(i)}
                currencySymbol={currencySymbol}
                isActive={isActive}
                isToken={isToken(contractAddress)}
              />
            )
          }

          return null
        })}
      </Scrollbars>
    </div>
  )
}

TransactionsTableBody.propTypes = {
  setCurrentDigitalAssetAddress: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  isToken: PropTypes.func.isRequired,
  transactions: PropTypes.shape({
    filterData: PropTypes.shape({
      startTime: PropTypes.number.isRequired,
      endTime: PropTypes.number.isRequired,
      isOpen: PropTypes.bool.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
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
    foundItemsHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchQuery: PropTypes.string.isRequired,
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  activeTransactionIndex: PropTypes.number.isRequired,
}

export default TransactionsTableBody
