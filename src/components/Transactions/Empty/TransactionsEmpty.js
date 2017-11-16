import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

const {
  noActiveCurrency,
  customNetwork,
  blockExplorerError,
  blockExplorerLink,
} = i18n.transactions.table

function TransactionsEmpty({ emptyImageSrc, isCustomNetwork, isBlockExplorerError }) {
  const emptyClassNameModifier = isBlockExplorerError ? 'etherscan-error' : 'custom-network'

  const blockEplorerLink = !isBlockExplorerError ? null : (
    <a
      className='transactions-empty__etherscan-link'
      href='//etherscan.io'
      target='_blank'
      rel='noopener noreferrer'
    >
      {blockExplorerLink}
    </a>
  )

  let message = noActiveCurrency

  if (isCustomNetwork) {
    message = customNetwork
  } else if (isBlockExplorerError) {
    message = blockExplorerError
  }

  return (
    <div className='transactions'>
      <div
        className={`transactions-empty transactions-empty--${emptyClassNameModifier}`}
        style={{ backgroundImage: `url(${emptyImageSrc})` }}
      >
        <div className='transactions-empty__message'>{message}{blockEplorerLink}</div>
      </div>
    </div>
  )
}

TransactionsEmpty.propTypes = {
  emptyImageSrc: PropTypes.string.isRequired,
  isCustomNetwork: PropTypes.bool.isRequired,
  isBlockExplorerError: PropTypes.bool.isRequired,
}

export default TransactionsEmpty
