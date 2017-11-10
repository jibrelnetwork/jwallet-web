import React from 'react'
import PropTypes from 'prop-types'

import JTable from 'components/base/JTable'

function TransactionsTableEmpty({ emptyImageSrc, currencySymbol }) {
  return (
    <JTable name='transactions table--transactions-empty'>
      <div className='transactions-empty' style={{ backgroundImage: `url(${emptyImageSrc})` }}>
        <div className='transactions-empty__message'>
          {`Look like there isn't any ${currencySymbol} in your account yet`}
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
