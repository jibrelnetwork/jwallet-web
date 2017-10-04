import React from 'react'
import PropTypes from 'prop-types'

import JButton from 'components/base/JButton'

function Auth({ openNewKeyModal, openImportKeyModal }) {
  return (
    <div className='auth-wrap'>
      <div className='auth'>
        <div className='auth__title'>{'Authorization'}</div>
        <div className='auth__subtitle'>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae egestas nisi.'}
        </div>
        <div className='auth__buttons'>
          <JButton white label={'Create new key'} onClick={openNewKeyModal} />
          <JButton blue label={'Import key'} onClick={openImportKeyModal} />
        </div>
      </div>
    </div>
  )
}

Auth.propTypes = {
  openNewKeyModal: PropTypes.func.isRequired,
  openImportKeyModal: PropTypes.func.isRequired,
}

export default Auth
