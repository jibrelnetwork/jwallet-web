import React from 'react'
import PropTypes from 'prop-types'

import JPopover from 'components/base/JPopover'

function KeystoreManagerPopover(props) {
  const {
    onClickOutside,
    backupKeystore,
    setNewKeystorePassword,
    removeKeystoreAccounts,
  } = props

  const body = (
    <div className='keystore-manager-popover'>
      <div className='popover__item' onClick={backupKeystore}>{'Backup keys'}</div>
      <div className='popover__item' onClick={setNewKeystorePassword}>{'Set new password'}</div>
      <div className='popover__item popover__item--gray' onClick={removeKeystoreAccounts}>
        {'Clear keys'}
      </div>
    </div>
  )

  return <JPopover onClickOutside={onClickOutside} body={body} name='keystore-manager' />
}

KeystoreManagerPopover.propTypes = {
  backupKeystore: PropTypes.func.isRequired,
  setNewKeystorePassword: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func,
}

KeystoreManagerPopover.defaultProps = {
  onClickOutside: null,
}

export default KeystoreManagerPopover
