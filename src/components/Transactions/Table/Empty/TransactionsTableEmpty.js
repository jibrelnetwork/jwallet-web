import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import JTable from 'components/base/JTable'

const { emptyContract } = i18n.transactions.table

function TransactionsTableEmpty({ emptyImageSrc, currencySymbol }) {
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
