import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function KeysManager(props) {
  const { openKeystoreModal, accountName } = props

  return (
    <div className='keys-manager pull-right' onClick={openKeystoreModal}>
      <div className='keys-manager__title'>{'Keys manager'}</div>
      <div className='keys-manager__account'>{accountName}</div>
      <JIcon name='keys' className='keys-manager__icon' />
    </div>
  )
}

KeysManager.propTypes = {
  openKeystoreModal: PropTypes.func.isRequired,
  accountName: PropTypes.string.isRequired,
}

export default KeysManager
