import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TransactionMain from './TransactionMain'
import TransactionDetails from './TransactionDetails'

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = { isActive: false }
  }

  render() {
    const { type, symbol, status, from, to, address, txHash, fee, date, amountFixed } = this.props
    const { isActive } = this.state

    return (
      <div
        className={`transaction ${isActive ? 'transaction--active' : ''} table__item`}
        onClick={this.toggle}
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

  toggle = () => this.setState({ isActive: !this.state.isActive })
}

Transaction.propTypes = {
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
}

export default Transaction
