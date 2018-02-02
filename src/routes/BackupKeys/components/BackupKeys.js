import React from 'react'
import PropTypes from 'prop-types'

import JTextInput from 'components/base/JTextInput'

const BackupKeys = ({ setPassword, invalidFields, password }) => (
  <div className='backup-keys-view'>
    <JTextInput
      onValueChange={setPassword}
      name='backup-keys-password'
      placeholder='Password'
      value={password}
      errorMessage={invalidFields.password}
      editable
    />
  </div>
)

BackupKeys.propTypes = {
  setPassword: PropTypes.func.isRequired,
  // backup: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
}

export default BackupKeys
