import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

const {
  noActiveDigitalAsset,
  customNetwork,
  blockExplorerError,
  blockExplorerLink,
} = i18n.transactions.table

function TransactionsEmpty(props) {
  const { accountAddress, emptyImageSrc, isCustomNetwork, isBlockExplorerError } = props
  const emptyClassNameModifier = isBlockExplorerError ? 'etherscan-error' : 'custom-network'

  const blockExplorerLinkEl = !isBlockExplorerError ? null : (
    <a
      className='transactions-empty__etherscan-link'
      href={`//etherscan.io/address/${accountAddress}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      {blockExplorerLink}
    </a>
  )

  let message = noActiveDigitalAsset

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
        <div className='transactions-empty__message'>{message}{blockExplorerLinkEl}</div>
      </div>
    </div>
  )
}

TransactionsEmpty.propTypes = {
  accountAddress: PropTypes.string.isRequired,
  emptyImageSrc: PropTypes.string.isRequired,
  isCustomNetwork: PropTypes.bool.isRequired,
  isBlockExplorerError: PropTypes.bool.isRequired,
}

export default TransactionsEmpty
