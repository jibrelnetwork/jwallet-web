import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import { JIcon, JPopover } from 'components/base'

const { keystoreManagerAction } = i18n.modals.keystore

function KeystoreManagerPopover(props) {
  const { onClickOutside, backupKeystore, clearKeystore, setKeystorePassword } = props

  const body = (
    <div className='keystore-manager-popover'>
      <div className='popover__item' onClick={backupKeystore}>
        <JIcon name='small-backup' className='popover__icon' small />
        <span className='popover__label'>{keystoreManagerAction.backupKeystore}</span>
      </div>
      <div className='popover__item' onClick={setKeystorePassword}>
        <JIcon name='gear' className='popover__icon' small />
        <span className='popover__label'>{keystoreManagerAction.changePassword}</span>
      </div>
      <div className='popover__item popover__item--gray' onClick={clearKeystore}>
        <JIcon name='small-clear' className='popover__icon' small />
        <span className='popover__label'>{keystoreManagerAction.removeAccounts}</span>
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
