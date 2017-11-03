import React from 'react'
import PropTypes from 'prop-types'

import { PasswordField, SubmitModal } from 'components'
import JTextInput from 'components/base/JTextInput'

class NewKeystorePasswordModal extends SubmitModal {
  renderModalBody = () => {
    return (
      <div>
        {this.renderOldPassword()}
        {this.renderNewPassword()}
      </div>
    )
  }

  renderOldPassword = () => {
    const { setOldKeystorePassword, invalidFields, oldPassword } = this.props

    return (
      <JTextInput
        onValueChange={setOldKeystorePassword}
        name='keystore-password'
        placeholder='Current password'
        value={oldPassword}
        errorMessage={invalidFields.oldPassword}
        editable
        secureTextEntry
      />
    )
  }

  renderNewPassword = () => {
    const { setNewKeystorePassword, invalidFields, newPassword } = this.props

    return (
      <PasswordField
        onPasswordChange={setNewKeystorePassword}
        password={newPassword}
        placeholder='New password'
        errorMessage={invalidFields.newPassword}
      />
    )
  }

  setKeystorePassword = () => {
    const { setKeystorePassword, oldPassword, newPassword } = this.props

    setKeystorePassword(oldPassword, newPassword, this.closeModal, this.setInvalid)
  }

  setInvalid = (err) => {
    const errMsg = err.message
    const fieldName = (errMsg === 'Password is incorrect') ? 'oldPassword' : 'newPassword'

    this.props.setNewKeystorePasswordInvalidField(fieldName, errMsg)
    this.shake()
  }

  isModalButtonDisabled = () => {
    const { oldPassword, newPassword } = this.props

    return !(oldPassword.length && newPassword.length)
  }

  submitModal = () => this.setKeystorePassword()
  closeModal = () => this.props.closeNewKeystorePasswordModal()
}

NewKeystorePasswordModal.propTypes = {
  closeNewKeystorePasswordModal: PropTypes.func.isRequired,
  setOldKeystorePassword: PropTypes.func.isRequired,
  setNewKeystorePassword: PropTypes.func.isRequired,
  setNewKeystorePasswordInvalidField: PropTypes.func.isRequired,
  setKeystorePassword: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  oldPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

NewKeystorePasswordModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default NewKeystorePasswordModal
