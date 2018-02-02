import React from 'react'
import PropTypes from 'prop-types'

import JTextInput from 'components/base/JTextInput'

const ClearKeys = ({ setPassword, invalidFields, password }) => (
  <div className='clear-keys-view'>
    <JTextInput
      onValueChange={setPassword}
      name='clear-keys-password'
      placeholder='Password'
      value={password}
      errorMessage={invalidFields.password}
      editable
    />
  </div>
)

ClearKeys.propTypes = {
  setPassword: PropTypes.func.isRequired,
  // clear: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
}

export default ClearKeys
