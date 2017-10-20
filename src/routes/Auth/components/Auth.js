import React from 'react'
import PropTypes from 'prop-types'

import JButton from 'components/base/JButton'

function Auth(props) {
  const { openNewKeystoreAccountModal, openImportKeystoreAccountModal } = props

  return (
    <div className='auth-wrap'>
      <div className='auth'>
        <div className='auth__title'>{'Authorization'}</div>
        <div className='auth__subtitle'>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae egestas nisi.'}
        </div>
        <div className='auth__buttons'>
          <JButton white label={'Create new key'} onClick={openNewKeystoreAccountModal} />
          <JButton blue label={'Import key'} onClick={openImportKeystoreAccountModal} />
        </div>
      </div>
    </div>
  )
}

Auth.propTypes = {
  openNewKeystoreAccountModal: PropTypes.func.isRequired,
  openImportKeystoreAccountModal: PropTypes.func.isRequired,
}

export default Auth
