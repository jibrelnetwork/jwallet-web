import React, { Component } from 'react'
import PropTypes from 'prop-types'

import date from 'utils/date'

import JbIcon from 'components/base/JbIcon'

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
  }

  render() {
    return (
      <div className='transaction' onClick={this.toggle}>
        {this.renderMain()}
        {this.renderDetails()}
      </div>
    )
  }

  renderMain() {
    const { type, amount, symbol, timestamp, status, from, to } = this.props
    const { active } = this.state
    const dateString = date(new Date(timestamp), 'hh:mm MM/DD/YYYY')

    return (
      <div className='row clear'>
        <div className='col-3'>
          <JbIcon
            name={`small-${(status === 'Rejected') ? 'convert' : type}`}
            className='transaction__type'
            small
          />
          <span className='transaction__amount'>{`${amount} ${symbol}`}</span>
        </div>
        <div className='col-3'>{dateString}</div>
        <div className='col-3 transaction__address'>{(type === 'receive') ? from : to}</div>
        <div className='col-3'>
          <span className={`transaction__status transaction__status--${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
        <JbIcon
          name={'small-arrow'}
          className={`transaction__icon ${active ? 'transaction__icon--active' : ''}`}
          small
        />
      </div>
    )
  }

  renderDetails() {
    const { txHash, fee, from, to } = this.props
    const { active } = this.state

    return (
      <div className={`transaction__details ${active ? 'transaction__details--active' : ''}`}>
        <div className='transaction__detail'>
          <div className='title'>{'Txhash'}</div><div className='value'>{txHash}</div>
        </div>
        <div className='transaction__detail'>
          <div className='title'>{'Fee'}</div><div className='value'>{fee}</div>
        </div>
        <div className='transaction__detail'>
          <div className='title'>{'From'}</div><div className='value'>{from}</div>
        </div>
        <div className='transaction__detail'>
          <div className='title'>{'To'}</div><div className='value'>{to}</div>
        </div>
      </div>
    )
  }

  toggle = () => this.setState({ active: !this.state.active })
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
