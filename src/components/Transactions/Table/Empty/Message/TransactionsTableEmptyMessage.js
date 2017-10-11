import React from 'react'
import PropTypes from 'prop-types'

function TransactionsTableEmptyMessage(props) {
  const { currencySymbol, isETH } = props

  const message = currencySymbol
    ? `Look like there isn't any ${currencySymbol} in your account yet`
    : 'Look like there isn\'t any active currency'

  if (isETH) {
    return (
      <div className='transactions-table-empty-message'>
        {'At the moment we can not load your ETH transactions'}
        <a
          className='transactions-table-empty-message__etherscan'
          href='//etherscan.io'
          target='_blank'
          rel='noopener noreferrer'
        >
          {'See them in the blockexplorer'}
        </a>
      </div>
    )
  }

  return <div className='transactions-table-empty-message'>{message}</div>
}

TransactionsTableEmptyMessage.propTypes = {
  currencySymbol: PropTypes.string,
  isETH: PropTypes.bool,
}

TransactionsTableEmptyMessage.defaultProps = {
  currencySymbol: null,
  isETH: false,
}

export default TransactionsTableEmptyMessage
