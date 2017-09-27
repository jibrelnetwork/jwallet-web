import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TransactionMain from './TransactionMain'
import TransactionDetails from './TransactionDetails'

class Transaction extends Component {
  render() {
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
    } = this.props

    return (
      <div className={`transaction ${isActive ? 'transaction--active' : ''} table__item`}>
        <TransactionMain
          setCurrentAccount={this.setCurrentAccount}
          toggleActive={toggleActive}
          accountIndex={this.getAccountIndex(to)}
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

  getAccountIndex = (requestedAddress) => {
    let foundIndex = -1

    this.props.accountItems.forEach(({ address, isActive, isAuthRequired }, index) => {
      if (!isActive || isAuthRequired) {
        return
      }

      if (address === requestedAddress) {
        foundIndex = index
      }
    })

    return foundIndex
  }

  setCurrentAccount = accountIndex => (e) => {
    e.preventDefault()

    this.props.setCurrentAccount(accountIndex)

    e.stopPropagation()
  }
}

Transaction.propTypes = {
  setCurrentAccount: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  accountItems: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAuthRequired: PropTypes.bool.isRequired,
  })).isRequired,
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
