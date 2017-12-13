import React from 'react'
import PropTypes from 'prop-types'

import JTable from 'components/base/JTable'

function TransactionsTableEmpty({ emptyImageSrc, currencySymbol }) {
  const emptyContract = i18n('transactions.table.emptyContract') || []

  return (
    <JTable name='transactions table--transactions-empty'>
      <div className='transactions-empty' style={{ backgroundImage: `url(${emptyImageSrc})` }}>
        <div className='transactions-empty__message'>
          {`${emptyContract[0]} ${currencySymbol} ${emptyContract[1]}`}
        </div>
      </div>
    </JTable>
  )
}

TransactionsTableEmpty.propTypes = {
  emptyImageSrc: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
}

export default TransactionsTableEmpty
