import React from 'react'
import PropTypes from 'prop-types'

import JPopover from 'components/base/JPopover'

function KeystoreManagerPopover(props) {
  const { onClickOutside, backupKeystore, clearKeystore, setKeystorePassword } = props

  const body = (
    <div className='keystore-manager-popover'>
      <div className='popover__item' onClick={backupKeystore}>{'Backup keys'}</div>
      <div className='popover__item' onClick={setKeystorePassword}>{'Set new password'}</div>
      <div className='popover__item popover__item--gray' onClick={clearKeystore}>
        {'Clear keys'}
      </div>
    </div>
  )

  return <JPopover onClickOutside={onClickOutside} body={body} name='keystore-manager' />
}

KeystoreManagerPopover.propTypes = {
  backupKeystore: PropTypes.func.isRequired,
  clearKeystore: PropTypes.func.isRequired,
  setKeystorePassword: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func,
}

KeystoreManagerPopover.defaultProps = {
  onClickOutside: null,
}

export default KeystoreManagerPopover
