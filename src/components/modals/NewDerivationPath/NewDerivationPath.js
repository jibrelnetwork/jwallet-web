import React from 'react'
import PropTypes from 'prop-types'

import { handleEnterKeyPress, isKnownPath } from 'utils'

import { DerivationPath } from 'components'
import { JModal, JModalButton, JTextInput } from 'components/base'

class NewDerivationPath extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'new-derivation-path' }
  }

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

  renderHeader = () => {
    return <div className='modal__title'>{'New Derivation Path'}</div>
  }

  renderBody = () => {
    return (
      <div>
        {this.renderPassword()}
        {this.renderDerivationPathOptions()}
      </div>
    )
  }

  renderDerivationPathOptions = () => {
    const { setCustomDerivationPath, knownDerivationPath } = this.props
    const fieldName = 'customDerivationPath'

    return (
      <DerivationPath
        setKnownDerivationPath={this.setKnownDerivationPath}
        setCustomDerivationPath={setCustomDerivationPath}
        knownDerivationPath={knownDerivationPath}
        customDerivationPath={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
      />
    )
  }

  renderPassword = () => {
    const fieldName = 'password'

    return (
      <JTextInput
        onValueChange={this.props.setDerivationPathPassword}
        name='new-derivation-path-password'
        placeholder='Password'
        value={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        editable
        secureTextEntry
      />
    )
  }

  renderFooter = () => {
    return (
      <JModalButton
        onPress={this.setDerivationPath}
        name={'new-derivation-path'}
        title={'Set derivation path'}
        disabled={this.isModalButtonDisabled()}
      />
    )
  }

  isModalButtonDisabled = () => {
    const isPasswordEmpty = !this.props.password.length
    const isPasswordInvalid = !!this.getInvalidFieldMessage('password').length
    const isCusomPathInvalid = !!this.getInvalidFieldMessage('customDerivationPath').length

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

  closeModal = () => {
    const { closeNewDerivationPathModal, onClose } = this.props

    if (onClose) {
      onClose()
    }

    closeNewDerivationPathModal()
  }

  onSuccess = () => this.closeModal()
  setKnownDerivationPath = path => () => this.props.setKnownDerivationPath(path)
  submitModal = event => handleEnterKeyPress(this.setDerivationPath)(event)
}

NewDerivationPath.propTypes = {
  closeNewDerivationPathModal: PropTypes.func.isRequired,
  setDerivationPathPassword: PropTypes.func.isRequired,
  setKnownDerivationPath: PropTypes.func.isRequired,
  setCustomDerivationPath: PropTypes.func.isRequired,
  setNewDerivationPathInvalidField: PropTypes.func.isRequired,
  setKeystoreAccountDerivationPath: PropTypes.func.isRequired,
  invalidFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  accountId: PropTypes.string.isRequired,
  currentDerivationPath: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

NewDerivationPath.defaultProps = {
  onClose: null,
}

export default NewDerivationPath
