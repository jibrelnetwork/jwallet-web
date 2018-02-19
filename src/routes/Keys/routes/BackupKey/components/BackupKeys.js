import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const BackupKeys = ({ setPassword, backup, invalidFields, password }) => (
  <div className='backup-keys-view'>
    <JTextInput
      onValueChange={setPassword}
      value={password}
      name='backup-keys-password'
      errorMessage={invalidFields.password}
      placeholder={i18n('routes.backupKeys.placeholder.password')}
      editable
      secureTextEntry
    />
    <JButton onClick={backup} label={i18n('routes.backupKeys.buttonTitle')} blue />
  </div>
)

BackupKeys.propTypes = {
  setPassword: PropTypes.func.isRequired,
  backup: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
}

export default BackupKeys
