import React from 'react'
import PropTypes from 'prop-types'

import JTextInput from 'components/base/JTextInput'

function DerivationPathCustom(props) {
  const { setCustomDerivationPath, customDerivationPath, errorMessage } = props

  return (
    <JTextInput
      onValueChange={setCustomDerivationPath}
      name='custom-derivation--path'
      placeholder='Custom derivation path'
      value={customDerivationPath}
      errorMessage={errorMessage}
      editable
    />
  )
}

DerivationPathCustom.propTypes = {
  setCustomDerivationPath: PropTypes.func.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
}

export default DerivationPathCustom
