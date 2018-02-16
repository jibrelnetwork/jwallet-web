import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const Password = ({
  setPassword,
  save,
  invalidFields,
  password,
}) => (
  <div className='edit-key-password'>
    <JTextInput
      onValueChange={setPassword}
      value={password}
      name='edit-key-password'
      errorMessage={invalidFields.password}
      placeholder={i18n('routes.editKey.placeholder.password')}
      editable
      secureTextEntry
    />
    <JButton onClick={save} label={i18n('routes.editKey.buttonTitle.password')} blue />
  </div>
)

Password.propTypes = {
  setPassword: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
}

export default Password
