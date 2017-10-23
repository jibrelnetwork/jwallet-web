import React from 'react'
import PropTypes from 'prop-types'

import { knownDerivationPaths } from 'utils/knownDerivationPaths'

import JRadio from 'components/base/JRadio'

function DerivationPathKnown(props) {
  const { setKnownDerivationPath, knownDerivationPath, disabled } = props
  const disabledClassName = disabled ? 'derivation-path__known--disabled' : ''

  return (
    <div className={`derivation-path__known ${disabledClassName}`}>
      {knownDerivationPaths.map((item, index) => {
        const { path, description } = item
        const isActive = (!disabled && (knownDerivationPath === path))
        const setPath = disabled ? null : setKnownDerivationPath(path)

        return (
          <div onClick={setPath} className='derivation-path__item clear' key={index}>
            <JRadio name={`toggle-${path}`} isActive={isActive} />
            <div className='derivation-path__path pull-left'>{path}</div>
            <div className='derivation-path__description pull-left'>{description}</div>
          </div>
        )
      })}
    </div>
  )
}

DerivationPathKnown.propTypes = {
  setKnownDerivationPath: PropTypes.func.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default DerivationPathKnown
