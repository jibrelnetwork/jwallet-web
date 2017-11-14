import React from 'react'
import PropTypes from 'prop-types'

import { DerivationPath, Expandable, PasswordField, SubmitModal } from 'components'
import JTextInput from 'components/base/JTextInput'

import { IMPORT_KEYSTORE_ACCOUNT_STEPS } from 'routes/JWallet/modules/modals/importKeystoreAccount'

class ImportKeystoreAccountModal extends SubmitModal {
  componentWillMount() {
    this.resetModal()
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
    const {
      setImportKeystoreAccountPassword,
      setImportKeystoreAccountPasswordConfirm,
      invalidFields,
      password,
      passwordConfirm,
      isCreating,
      isInitialized,
    } = this.props

    if (isInitialized) {
      return (
        <JTextInput
          onValueChange={setImportKeystoreAccountPassword}
          name='import-keystore-account-password'
          placeholder='Password'
          value={password}
          errorMessage={invalidFields.password}
          editable={!isCreating}
          secureTextEntry
        />
      )
    }

    return (
      <PasswordField
        onPasswordChange={setImportKeystoreAccountPassword}
        onPasswordConfirmChange={setImportKeystoreAccountPasswordConfirm}
        password={password}
        passwordConfirm={passwordConfirm}
        passwordError={invalidFields.password}
        passwordConfirmError={invalidFields.passwordConfirm}
        withConfirm
      />
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

  closeModal = () => {
    this.props.closeImportKeystoreAccountModal()
    this.resetModal()
  }

  resetModal = () => {
    this.props.setImportKeystoreAccountCurrentStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.BEFORE, {})
  }

  setKnownDerivationPath = p => () => this.props.setImportKeystoreAccountKnownDerivationPath(p)
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
