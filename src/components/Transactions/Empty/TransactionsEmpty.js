import React from 'react'
import PropTypes from 'prop-types'

function TransactionsEmpty({ emptyImageSrc, isCustomNetwork }) {
  const emptyClassNameModifier = isCustomNetwork ? 'custom-network' : 'etherscan-error'

  const message = isCustomNetwork ? (
    <div className='transactions-empty__message'>
      {'We can not load transactions for the private blockchain'}
    </div>
  ) : (
    <div className='transactions-empty__message'>
      {'At the moment we can not load your ETH transactions'}
      <a
        className='transactions-empty__etherscan-link'
        href='//etherscan.io'
        target='_blank'
        rel='noopener noreferrer'
      >
        {'See them in the blockexplorer'}
      </a>
    </div>
  )

  return (
    <div className='transactions'>
      <div
        className={`transactions-empty transactions-empty--${emptyClassNameModifier}`}
        style={{ backgroundImage: `url(${emptyImageSrc})` }}
      >
        {message}
      </div>
    </div>
  )
}

TransactionsEmpty.propTypes = {
  emptyImageSrc: PropTypes.string.isRequired,
  isCustomNetwork: PropTypes.bool.isRequired,
}

export default TransactionsEmpty
