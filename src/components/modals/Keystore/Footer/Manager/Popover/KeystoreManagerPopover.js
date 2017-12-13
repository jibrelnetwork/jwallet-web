import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JPopover } from 'components/base'

function KeystoreManagerPopover({
  onClickOutside,
  backupKeystore,
  clearKeystore,
  setKeystorePassword,
}) {
  return (
    <JPopover
      onClickOutside={onClickOutside}
      body={(
        <div className='keystore-manager-popover'>
          <div className='popover__item' onClick={backupKeystore}>
            <JIcon name='small-backup' className='popover__icon' small />
            <span className='popover__label'>
              {i18n('modals.keystore.keystoreManagerAction.backupKeystore')}
            </span>
          </div>
          <div className='popover__item' onClick={setKeystorePassword}>
            <JIcon name='gear' className='popover__icon' small />
            <span className='popover__label'>
              {i18n('modals.keystore.keystoreManagerAction.changePassword')}
            </span>
          </div>
          <div className='popover__item popover__item--gray' onClick={clearKeystore}>
            <JIcon name='small-clear' className='popover__icon' small />
            <span className='popover__label'>
              {i18n('modals.keystore.keystoreManagerAction.removeAccounts')}
            </span>
          </div>
        </div>
      )}
      name='keystore-manager'
    />
  )
}

KeystoreManagerPopover.propTypes = {
  backupKeystore: PropTypes.func.isRequired,
  clearKeystore: PropTypes.func.isRequired,
  setKeystorePassword: PropTypes.func.isRequired,
  /* optional */
  onClickOutside: PropTypes.func,
}

KeystoreManagerPopover.defaultProps = {
  onClickOutside: null,
}

export default KeystoreManagerPopover
