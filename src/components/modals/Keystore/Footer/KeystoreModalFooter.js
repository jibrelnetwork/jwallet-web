import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'
import KeystoreManager from './Manager'

function KeystoreModalFooter(props) {
  const {
    addNewKeystoreAccount,
    importKey,
    backupKeystore,
    clearKeystore,
    setKeystorePassword,
  } = props

  return (
    <div className='keystore-modal-footer clear'>
      <div className='keystore-modal-footer__item pull-left' onClick={addNewKeystoreAccount}>
        <JIcon name='small-add' className='keystore-modal-footer__icon' small />{'New key'}
      </div>
      <div className='keystore-modal-footer__item pull-left' onClick={importKey}>
        <JIcon name='small-import' className='keystore-modal-footer__icon' small />{'Import key'}
      </div>
      <KeystoreManager
        backupKeystore={backupKeystore}
        clearKeystore={clearKeystore}
        setKeystorePassword={setKeystorePassword}
      />
    </div>
  )
}

KeystoreModalFooter.propTypes = {
  addNewKeystoreAccount: PropTypes.func.isRequired,
  importKey: PropTypes.func.isRequired,
  backupKeystore: PropTypes.func.isRequired,
  clearKeystore: PropTypes.func.isRequired,
  setKeystorePassword: PropTypes.func.isRequired,
}

export default KeystoreModalFooter
