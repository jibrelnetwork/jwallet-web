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
    return (
      <div>
        {this.renderPassword()}
        {this.renderDerivationPathOptions()}
      </div>
    )
  }

  renderDerivationPathOptions = () => {
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

  renderPassword = () => {
    const { setDerivationPathPassword, invalidFields, password } = this.props

    return (
      <JTextInput
        onValueChange={setDerivationPathPassword}
        name='new-derivation-path-password'
        placeholder='Password'
        value={password}
        errorMessage={invalidFields.password}
        editable
        secureTextEntry
      />
    )
  }

  isModalButtonDisabled = () => {
    const { invalidFields, password } = this.props
    const invalidPassword = invalidFields.password || ''
    const invalidCusomPath = invalidFields.customDerivationPath || ''

    const isPasswordEmpty = !password.length
    const isPasswordInvalid = !!invalidPassword.length
    const isCusomPathInvalid = !!invalidCusomPath.length

    return (isPasswordEmpty || isPasswordInvalid || isCusomPathInvalid)
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
