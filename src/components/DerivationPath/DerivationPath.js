import React from 'react'
import PropTypes from 'prop-types'

import DerivationPathKnown from './Known'
import DerivationPathCustom from './Custom'

function DerivationPath(props) {
  const {
    setKnownDerivationPath,
    setCustomDerivationPath,
    knownDerivationPath,
    customDerivationPath,
    errorMessage,
  } = props

  return (
    <div className='derivation-path'>
      <DerivationPathKnown
        setKnownDerivationPath={setKnownDerivationPath}
        knownDerivationPath={knownDerivationPath}
        disabled={!!customDerivationPath.length}
      />
      <DerivationPathCustom
        setCustomDerivationPath={setCustomDerivationPath}
        customDerivationPath={customDerivationPath}
        errorMessage={errorMessage}
      />
    </div>
  )
}

DerivationPath.propTypes = {
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
}

export default DerivationPath
