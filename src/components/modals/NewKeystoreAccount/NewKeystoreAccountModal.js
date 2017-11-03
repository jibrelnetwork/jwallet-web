import React from 'react'
import PropTypes from 'prop-types'

import { PasswordField, SubmitModal } from 'components'
import JTextInput from 'components/base/JTextInput'

import { NEW_KEYSTORE_ACCOUNT_STEPS } from 'routes/JWallet/modules/modals/newKeystoreAccount'

class NewKeystoreAccountModal extends SubmitModal {
  componentWillMount() {
    const { setNewKeystoreAccountCurrentStep, isInitialized } = this.props

    if (!isInitialized) {
      return setNewKeystoreAccountCurrentStep()
    }

    // start from mnemonic step if keystore already initialized
    return setNewKeystoreAccountCurrentStep(NEW_KEYSTORE_ACCOUNT_STEPS.BEFORE_MNEMONIC)
  }

  componentWillReceiveProps(nextProps) {
    const { invalidFields } = nextProps

    if (this.props.invalidFields !== invalidFields) {
      this.shakeIfInvalidField(invalidFields)
    }

    this.scrollToTop(nextProps)
  }

  shakeIfInvalidField = (invalidFields) => {
    Object.keys(invalidFields).map((field) => {
      if (invalidFields[field] && invalidFields[field].length) {
        if (this.props.invalidFields[field] !== invalidFields[field]) {
          this.shake()
        }
      }
    })
  }

  renderModalBody = () => {
    switch (this.props.currentStep) {
      case NEW_KEYSTORE_ACCOUNT_STEPS.SAVE_MNEMONIC:
        return this.renderSaveMnemonic()
      case NEW_KEYSTORE_ACCOUNT_STEPS.CHECK_MNEMONIC:
        return this.renderCheckMnemonic()
      case NEW_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD:
        return this.renderSetPassword()
      default:
        return ''
    }
  }

  renderSaveMnemonic = () => {
    return (
      <JTextInput
        name='new-keystore-account-mnemonic'
        placeholder='Mnemonic'
        value={this.props.mnemonic}
        editable
        readOnly
        multiline
        preventCopy
        unselectable
      />
    )
  }

  renderCheckMnemonic = () => {
    const {
      setNewKeystoreAccountMnemonicConfirm,
      validFields,
      invalidFields,
      mnemonicConfirm,
    } = this.props

    return (
      <JTextInput
        onValueChange={setNewKeystoreAccountMnemonicConfirm}
        name='new-keystore-account-mnemonic-confirm'
        placeholder='Mnemonic'
        value={mnemonicConfirm}
        errorMessage={invalidFields.mnemonicConfirm}
        successMessage={validFields.mnemonicConfirm}
        editable
        multiline
      />
    )
  }

  renderSetPassword = () => {
    const { isCreating, isInitialized } = this.props

    return (
      <div>
        {this.renderPasswordField(isCreating, isInitialized)}
        {this.renderPasswordConfirmField(isCreating, isInitialized)}
      </div>
    )
  }

  renderPasswordField = (isCreating, isInitialized) => {
    const { setNewKeystoreAccountPassword, validFields, invalidFields, password } = this.props

    const passwordProps = {
      errorMessage: invalidFields.password,
      successMessage: validFields.password,
      editable: !isCreating,
    }

    if (isInitialized) {
      return (
        <JTextInput
          {...passwordProps}
          onValueChange={setNewKeystoreAccountPassword}
          name='new-keystore-account-password'
          placeholder='Password'
          value={password}
          secureTextEntry
        />
      )
    }

    return (
      <PasswordField
        {...passwordProps}
        onPasswordChange={setNewKeystoreAccountPassword}
        password={password}
      />
    )
  }

  renderPasswordConfirmField = (isCreating, isInitialized) => {
    if (isInitialized) {
      return null
    }

    const {
      setNewKeystoreAccountPasswordConfirm,
      invalidFields,
      validFields,
      passwordConfirm,
    } = this.props

    return (
      <JTextInput
        onValueChange={setNewKeystoreAccountPasswordConfirm}
        name='new-keystore-account-password-confirm'
        placeholder='Confirm Password'
        value={passwordConfirm}
        errorMessage={invalidFields.passwordConfirm}
        successMessage={validFields.passwordConfirm}
        editable={!isCreating}
        secureTextEntry
      />
    )
  }

  isModalButtonDisabled = () => {
    const { invalidFields, password, mnemonicConfirm, currentStep } = this.props
    const isInvalidField = !!Object.keys(invalidFields).filter(f => invalidFields[f].length).length

    if (isInvalidField) {
      return true
    }

    if (currentStep === NEW_KEYSTORE_ACCOUNT_STEPS.CHECK_MNEMONIC) {
      return !mnemonicConfirm.length
    } else if (currentStep === NEW_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD) {
      return !password.length
    }

    return false
  }

  submitModal = () => {
    const {
      setNewKeystoreAccountCurrentStep,
      onClose,
      mnemonic,
      mnemonicConfirm,
      password,
      passwordConfirm,
      currentStep,
      isInitialized,
    } = this.props

    setNewKeystoreAccountCurrentStep(currentStep, {
      onClose,
      mnemonic,
      mnemonicConfirm,
      password,
      passwordConfirm,
      isInitialized,
    })
  }

  closeModal = () => this.props.closeNewKeystoreAccountModal()
}

NewKeystoreAccountModal.propTypes = {
  closeNewKeystoreAccountModal: PropTypes.func.isRequired,
  setNewKeystoreAccountMnemonicConfirm: PropTypes.func.isRequired,
  setNewKeystoreAccountPassword: PropTypes.func.isRequired,
  setNewKeystoreAccountPasswordConfirm: PropTypes.func.isRequired,
  setNewKeystoreAccountCurrentStep: PropTypes.func.isRequired,
  validFields: PropTypes.shape({}).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  mnemonic: PropTypes.string.isRequired,
  mnemonicConfirm: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  alert: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

NewKeystoreAccountModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default NewKeystoreAccountModal
