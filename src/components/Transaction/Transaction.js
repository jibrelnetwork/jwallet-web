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
    const { type, amount, symbol, timestamp, status, from, to, txHash, fee } = this.props
    const { isActive } = this.state

    return (
      <div className='transaction' onClick={this.toggle}>
        <TransactionMain
          type={type}
          amount={amount}
          symbol={symbol}
          status={status}
          from={from}
          to={to}
          timestamp={timestamp}
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
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  txHash: PropTypes.string.isRequired,
  fee: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
}

export default Transaction
