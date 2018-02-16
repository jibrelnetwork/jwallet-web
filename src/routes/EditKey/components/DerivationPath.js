import React from 'react'
import PropTypes from 'prop-types'

import handle from 'utils/handle'
import { DerivationPath, Expandable } from 'components'

const ExpandableDerivationPath = ({
  setKnownDerivationPath,
  setCustomDerivationPath,
  validFields,
  invalidFields,
  knownDerivationPath,
  customDerivationPath,
}) => (
  <Expandable title={i18n('routes.editKey.derivationPathTitle')} >
    <DerivationPath
      setKnownDerivationPath={handle(setKnownDerivationPath)}
      setCustomDerivationPath={setCustomDerivationPath}
      knownDerivationPath={knownDerivationPath}
      customDerivationPath={customDerivationPath}
      errorMessage={invalidFields.customDerivationPath}
      successMessage={validFields.customDerivationPath}
    />
  </Expandable>
)

ExpandableDerivationPath.propTypes = {
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
}

export default ExpandableDerivationPath
