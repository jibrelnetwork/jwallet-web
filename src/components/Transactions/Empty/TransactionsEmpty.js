import React from 'react'
import PropTypes from 'prop-types'

function TransactionsEmpty({ emptyImageSrc, isCustomNetwork, isBlockExplorerError }) {
  const emptyClassNameModifier = isBlockExplorerError ? 'etherscan-error' : 'custom-network'

  const blockEplorerLink = !isBlockExplorerError ? null : (
    <a
      className='transactions-empty__etherscan-link'
      href='//etherscan.io'
      target='_blank'
      rel='noopener noreferrer'
    >
      {'See them in the blockexplorer'}
    </a>
  )

  let message = 'Look like there isn\'t any active currency'

  if (isCustomNetwork) {
    message = 'We can not load transactions for the private blockchain'
  } else if (isBlockExplorerError) {
    message = 'At the moment we can not load your ETH transactions'
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
