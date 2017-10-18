import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'
import KeystoreManager from './Manager'

function KeystoreModalFooter(props) {
  const {
    addNewKey,
    importKey,
    backupKeystore,
    setNewKeystorePassword,
    removeKeystoreAccounts,
  } = props

  return (
    <div className='keystore-modal-footer clear'>
      <div className='keystore-modal-footer__item pull-left' onClick={addNewKey}>
        <JIcon name='small-add' className='keystore-modal-footer__icon' small />{'New key'}
      </div>
      <div className='keystore-modal-footer__item pull-left' onClick={importKey}>
        <JIcon name='small-import' className='keystore-modal-footer__icon' small />{'Import key'}
      </div>
      <KeystoreManager
        backupKeystore={backupKeystore}
        setNewKeystorePassword={setNewKeystorePassword}
        removeKeystoreAccounts={removeKeystoreAccounts}
      />
    </div>
  )
}

KeystoreModalFooter.propTypes = {
  addNewKey: PropTypes.func.isRequired,
  importKey: PropTypes.func.isRequired,
  backupKeystore: PropTypes.func.isRequired,
  setNewKeystorePassword: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
}

export default KeystoreModalFooter
