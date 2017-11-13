import React from 'react'
import PropTypes from 'prop-types'

import { isKnownPath } from 'utils'

import { DerivationPath, SubmitModal } from 'components'
import JTextInput from 'components/base/JTextInput'

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
      setCustomDerivationPath,
      invalidFields,
      knownDerivationPath,
      customDerivationPath,
    } = this.props

    return (
      <DerivationPath
        setKnownDerivationPath={this.setKnownDerivationPath}
        setCustomDerivationPath={setCustomDerivationPath}
        knownDerivationPath={knownDerivationPath}
        customDerivationPath={customDerivationPath}
        errorMessage={invalidFields.customDerivationPath}
      />
    )
  }

  setDerivationPath = () => {
    const {
      setKeystoreAccountDerivationPath,
      accountId,
      password,
      knownDerivationPath,
      customDerivationPath,
    } = this.props

    const newPath = customDerivationPath.length ? customDerivationPath : knownDerivationPath

    setKeystoreAccountDerivationPath(password, accountId, newPath, this.onSuccess, this.onFail)
  }

  onFail = (err) => {
    const { message } = err
    const isPasswordError = /password/ig.test(message)
    const errField = isPasswordError ? 'password' : 'customDerivationPath'

    this.shake()
    this.props.setNewDerivationPathInvalidField(errField, message)
  }

  onSuccess = () => this.closeModal()
  submitModal = () => this.setDerivationPath()
  closeModal = () => this.props.closeNewDerivationPathModal()
  setPassword = password => this.props.setDerivationPathPassword(password)
  setKnownDerivationPath = path => () => this.props.setKnownDerivationPath(path)
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
  /* optional */
  onClose: PropTypes.func,
}

NewDerivationPath.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default NewDerivationPath
