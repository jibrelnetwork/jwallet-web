import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import JTextInput from 'components/base/JTextInput'

function DerivationPathCustom(props) {
  const { setCustomDerivationPath, customDerivationPath, errorMessage } = props

  return (
    <JTextInput
      onValueChange={setCustomDerivationPath}
      name='custom-derivation--path'
      placeholder={i18n.modals.derivationPath.placeholder.customDerivationPath}
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
