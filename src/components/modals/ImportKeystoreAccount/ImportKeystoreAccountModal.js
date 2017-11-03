import React from 'react'
import PropTypes from 'prop-types'

import { DerivationPath, Expandable, PasswordField, SubmitModal } from 'components'
import JTextInput from 'components/base/JTextInput'

import { IMPORT_KEYSTORE_ACCOUNT_STEPS } from 'routes/JWallet/modules/modals/importKeystoreAccount'

class ImportKeystoreAccountModal extends SubmitModal {
  componentWillMount() {
    this.props.setImportKeystoreAccountCurrentStep()
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
      case IMPORT_KEYSTORE_ACCOUNT_STEPS.DATA:
        return this.renderData()
      case IMPORT_KEYSTORE_ACCOUNT_STEPS.MNEMONIC_OPTIONS:
        return this.renderMnemonicOptions()
      case IMPORT_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD:
        return this.renderSetPassword()
      default:
        return ''
    }
  }

  renderData = (editable = true) => {
    const { setImportKeystoreAccountData, invalidFields, data } = this.props

    return (
      <JTextInput
        onValueChange={setImportKeystoreAccountData}
        name='import-keystore-account-data'
        placeholder='Address, private key, mnemonic, BIP32 xpub'
        value={data}
        errorMessage={invalidFields.data}
        editable={editable}
        multiline
      />
    )
  }

  renderMnemonicOptions = () => {
    return (
      <div>
        {this.renderData(false)}
        {this.renderDerivationPathOptions()}
      </div>
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

  renderDerivationPathOptions = () => {
    const {
      setImportKeystoreAccountCustomDerivationPath,
      invalidFields,
      knownDerivationPath,
      customDerivationPath,
    } = this.props

    return (
      <Expandable>
        <DerivationPath
          setKnownDerivationPath={this.setKnownDerivationPath}
          setCustomDerivationPath={setImportKeystoreAccountCustomDerivationPath}
          knownDerivationPath={knownDerivationPath}
          customDerivationPath={customDerivationPath}
          errorMessage={invalidFields.customDerivationPath}
        />
      </Expandable>
    )
  }

  renderPasswordField = (isCreating, isInitialized) => {
    const { setImportKeystoreAccountPassword, invalidFields, password } = this.props

    const passwordProps = {
      errorMessage: invalidFields.password,
      editable: !isCreating,
    }

    if (isInitialized) {
      return (
        <JTextInput
          {...passwordProps}
          onValueChange={setImportKeystoreAccountPassword}
          name='import-keystore-account-password'
          placeholder='Password'
          value={password}
          secureTextEntry
        />
      )
    }

    return (
      <PasswordField
        {...passwordProps}
        onPasswordChange={setImportKeystoreAccountPassword}
        password={password}
      />
    )
  }

  renderPasswordConfirmField = (isCreating, isInitialized) => {
    if (isInitialized) {
      return null
    }

    const { setImportKeystoreAccountPasswordConfirm, invalidFields, passwordConfirm } = this.props

    return (
      <JTextInput
        onValueChange={setImportKeystoreAccountPasswordConfirm}
        name='import-keystore-account-password-confirm'
        placeholder='Confirm Password'
        value={passwordConfirm}
        errorMessage={invalidFields.passwordConfirm}
        editable={!isCreating}
        secureTextEntry
      />
    )
  }

  isModalButtonDisabled = () => {
    const { invalidFields, data, password, currentStep } = this.props
    const isInvalidField = !!Object.keys(invalidFields).filter(f => invalidFields[f].length).length

    if (isInvalidField) {
      return true
    }

    if (currentStep === IMPORT_KEYSTORE_ACCOUNT_STEPS.DATA) {
      return !data.length
    } else if (currentStep === IMPORT_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD) {
      return !password.length
    }

    return false
  }

  submitModal = () => {
    const {
      setImportKeystoreAccountCurrentStep,
      onClose,
      accountData,
      data,
      password,
      passwordConfirm,
      knownDerivationPath,
      customDerivationPath,
      currentStep,
      isInitialized,
    } = this.props

    setImportKeystoreAccountCurrentStep(currentStep, {
      onClose,
      accountData,
      data,
      password,
      passwordConfirm,
      isInitialized,
      derivationPath: customDerivationPath.length ? customDerivationPath : knownDerivationPath,
    })
  }

  setKnownDerivationPath = p => () => this.props.setImportKeystoreAccountKnownDerivationPath(p)
  closeModal = () => this.props.closeImportKeystoreAccountModal()
}

ImportKeystoreAccountModal.propTypes = {
  closeImportKeystoreAccountModal: PropTypes.func.isRequired,
  setImportKeystoreAccountData: PropTypes.func.isRequired,
  setImportKeystoreAccountPassword: PropTypes.func.isRequired,
  setImportKeystoreAccountPasswordConfirm: PropTypes.func.isRequired,
  setImportKeystoreAccountKnownDerivationPath: PropTypes.func.isRequired,
  setImportKeystoreAccountCustomDerivationPath: PropTypes.func.isRequired,
  setImportKeystoreAccountCurrentStep: PropTypes.func.isRequired,
  accountData: PropTypes.shape({
    type: PropTypes.string,
    mnemonic: PropTypes.string,
    bip32XPublicKey: PropTypes.string,
    privateKey: PropTypes.string,
    address: PropTypes.string,
    isReadOnly: PropTypes.bool,
  }).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  data: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
  alert: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  topLineFullness: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  isButtonLoading: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

ImportKeystoreAccountModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default ImportKeystoreAccountModal
