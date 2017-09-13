import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function KeysManagerTitle({ privateKey, balance, code }) {
  return (
    <div className='keys-manager-title'>
      <div className='keys-manager-title__head'>{'Keys manager'}</div>
      <div className='key key--title'>
        <span className='key__hash'>{privateKey}</span>
        <span className='key__balance'>{balance.toFixed(6)}</span>
        <span className='key__code'>{code}</span>
      </div>
      <JIcon name='keys' className='keys-manager-title__icon' />
    </div>
  )
}

KeysManagerTitle.propTypes = {
  privateKey: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
}

export default KeysManagerTitle
