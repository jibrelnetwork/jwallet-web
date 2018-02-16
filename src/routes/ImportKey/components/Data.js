import React from 'react'
import PropTypes from 'prop-types'

import handle from 'utils/handle'
import { JButton, JTextInput } from 'components/base'
import { DerivationPath, Expandable } from 'components'

const Data = ({
  setKeyData,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNextStep,
  validFields,
  invalidFields,
  data,
  knownDerivationPath,
  customDerivationPath,
  isMnemonic,
}) => (
  <div className='import-key-data-step'>
    <div style={{ margin: '20px' }}>{i18n('routes.importKey.alert.data')}</div>
    <JTextInput
      onValueChange={setKeyData}
      name='import-key-data'
      placeholder={i18n('routes.importKey.placeholder.data')}
      value={data}
      errorMessage={invalidFields.data}
      successMessage={validFields.data}
      editable
      multiline
    />
    {isMnemonic && (
      <Expandable>
        <DerivationPath
          setKnownDerivationPath={handle(setKnownDerivationPath)}
          setCustomDerivationPath={setCustomDerivationPath}
          knownDerivationPath={knownDerivationPath}
          customDerivationPath={customDerivationPath}
          errorMessage={invalidFields.customDerivationPath}
        />
      </Expandable>
    )}
    <JButton onClick={setNextStep} label={i18n('routes.importKey.buttonTitle.nextStep')} blue />
  </div>
)

Data.propTypes = {
  setKeyData: PropTypes.func.isRequired,
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  data: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  isMnemonic: PropTypes.bool.isRequired,
}

export default Data
