import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const MnemonicConfirm = ({
  setMnemonicConfirm,
  setPrevStep,
  setNextStep,
  validFields,
  invalidFields,
  mnemonicConfirm,
}) => (
  <div className='create-key-mnemonic-confirm-step'>
    <div style={{ margin: '20px' }}>{i18n('routes.createKey.alert.mnemonicConfirm')}</div>
    <JTextInput
      onValueChange={setMnemonicConfirm}
      name='create-key-mnemonic-confirm'
      placeholder={i18n('routes.createKey.placeholder.mnemonicConfirm')}
      value={mnemonicConfirm}
      errorMessage={invalidFields.mnemonicConfirm}
      successMessage={validFields.mnemonicConfirm}
      editable
      multiline
    />
    <JButton onClick={setPrevStep} label={i18n('routes.createKey.buttonTitle.prevStep')} blue />
    <JButton onClick={setNextStep} label={i18n('routes.createKey.buttonTitle.confirm')} blue />
  </div>
)

MnemonicConfirm.propTypes = {
  setMnemonicConfirm: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  setPrevStep: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  mnemonicConfirm: PropTypes.string.isRequired,
}

export default MnemonicConfirm
