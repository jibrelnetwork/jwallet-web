import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JTextInput } from 'components/base'

const Mnemonic = ({ setNextStep, mnemonic }) => (
  <div className='create-key-mnemonic-step'>
    <div style={{ margin: '20px' }}>{i18n('routes.createKey.alert.mnemonic')}</div>
    <JTextInput
      name='create-key-mnemonic'
      placeholder={i18n('routes.createKey.placeholder.mnemonic')}
      value={mnemonic}
      editable
      readOnly
      multiline
      preventCopy
      unselectable
    />
    <JButton onClick={setNextStep} label={i18n('routes.createKey.buttonTitle.save')} blue />
  </div>
)

Mnemonic.propTypes = {
  setNextStep: PropTypes.func.isRequired,
  mnemonic: PropTypes.string.isRequired,
}

export default Mnemonic
