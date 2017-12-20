import React from 'react'
import PropTypes from 'prop-types'

import { isKnownPath, handle } from 'utils'
import { DerivationPath, SubmitModal } from 'components'

class NewDerivationPath extends SubmitModal {
  componentWillReceiveProps(nextProps) {
    const { setKnownDerivationPath, setCustomDerivationPath, currentDerivationPath } = this.props
    const nextPath = nextProps.currentDerivationPath

    if (currentDerivationPath !== nextPath) {
      if (isKnownPath(nextPath)) {
        return setKnownDerivationPath(nextPath)
      }

      return setCustomDerivationPath(nextPath)
    }

    return null
  }

  renderModalBody = () => {
    const {
      setKnownDerivationPath,
      setCustomDerivationPath,
      invalidFields,
      knownDerivationPath,
      customDerivationPath,
    } = this.props

    return (
      <DerivationPath
        setKnownDerivationPath={handle(setKnownDerivationPath)}
        setCustomDerivationPath={setCustomDerivationPath}
        knownDerivationPath={knownDerivationPath}
        customDerivationPath={customDerivationPath}
        errorMessage={invalidFields.customDerivationPath}
      />
    )
  }

  submitModal = () => this.setDerivationPath()
  closeModal = () => this.props.closeNewDerivationPathModal()
  setDerivationPath = () => this.props.setKeystoreAccountDerivationPath()
  setPassword = password => this.props.setDerivationPathPassword(password)
}

NewDerivationPath.propTypes = {
  closeNewDerivationPathModal: PropTypes.func.isRequired,
  setDerivationPathPassword: PropTypes.func.isRequired,
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  setNewDerivationPathInvalidField: PropTypes.func.isRequired,
  setKeystoreAccountDerivationPath: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  accountId: PropTypes.string.isRequired,
  currentDerivationPath: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isOpenedFromKeystoreModal: PropTypes.bool.isRequired,
}

export default NewDerivationPath
