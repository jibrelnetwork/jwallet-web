import React from 'react'
import PropTypes from 'prop-types'

import JTable from 'components/base/JTable'

import TransactionsTableEmptyMessage from './Message'

function TransactionsTableEmpty(props) {
  const { imageSrc, currencySymbol } = props
  const backgroundImage = `url(${imageSrc})`
  const isETH = (currencySymbol === 'ETH')

  return (
    <JTable name='transactions table--transactions-empty'>
      <div
        className={`transactions-table-empty ${isETH ? 'transactions-table-empty--eth' : ''}`}
        style={{ backgroundImage }}
      >
        <TransactionsTableEmptyMessage currencySymbol={currencySymbol} isETH={isETH} />
      </div>
    </JTable>
  )
}

TransactionsTableEmpty.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string,
}

TransactionsTableEmpty.defaultProps = {
  currencySymbol: null,
}

export default TransactionsTableEmpty
