import React from 'react'
import PropTypes from 'prop-types'

import JbButton from 'components/base/JbButton'

function Auth({ openNewKeysModal, openImportKeysModal }) {
  return (
    <div className='auth-wrap'>
      <div className='auth'>
        <div className='auth__title'>{'Authorization'}</div>
        <div className='auth__subtitle'>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae egestas nisi.'}
        </div>
        <div className='auth__buttons'>
          <JbButton white label={'Create new keys'} onClick={openNewKeysModal} />
          <JbButton blue label={'Import keys'} onClick={openImportKeysModal} />
        </div>
      </div>
    </div>
  )
}

Auth.propTypes = {
  openNewKeysModal: PropTypes.func.isRequired,
  openImportKeysModal: PropTypes.func.isRequired,
}

export default Auth
