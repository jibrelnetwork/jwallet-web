import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JPopover } from 'components/base'

function KeystoreManagerPopover(props) {
  const { onClickOutside, backupKeystore, clearKeystore, setKeystorePassword } = props

  const body = (
    <div className='keystore-manager-popover'>
      <div className='popover__item' onClick={backupKeystore}>
        <JIcon name='small-backup' className='popover__icon' small />
        <span className='popover__label'>{'Backup keys'}</span>
      </div>
      <div className='popover__item' onClick={setKeystorePassword}>
        <JIcon name='gear' className='popover__icon' small />
        <span className='popover__label'>{'Set new password'}</span>
      </div>
      <div className='popover__item popover__item--gray' onClick={clearKeystore}>
        <JIcon name='small-clear' className='popover__icon' small />
        <span className='popover__label'>{'Clear keys'}</span>
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
