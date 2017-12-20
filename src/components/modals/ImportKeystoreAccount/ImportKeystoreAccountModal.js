import React from 'react'
import PropTypes from 'prop-types'

import handle from 'utils/handle'
import JTextInput from 'components/base/JTextInput'
import { DerivationPath, Expandable, PasswordField, SubmitModal } from 'components'
import { STEPS } from 'routes/JWallet/modules/modals/importKeystoreAccount'

class ImportKeystoreAccountModal extends SubmitModal {
  renderModalBody = () => {
    switch (this.props.currentStep) {
      case STEPS.DATA:
        return this.renderData()
      case STEPS.MNEMONIC_OPTIONS:
        return this.renderMnemonicOptions()
      case STEPS.SET_PASSWORD:
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
        placeholder={i18n('modals.importAccount.placeholder.data')}
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
          placeholder={i18n('modals.importAccount.placeholder.password')}
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
      setImportKeystoreAccountKnownDerivationPath,
      invalidFields,
      knownDerivationPath,
      customDerivationPath,
    } = this.props

    return (
      <Expandable>
        <DerivationPath
          setKnownDerivationPath={handle(setImportKeystoreAccountKnownDerivationPath)}
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

    if (currentStep === STEPS.DATA) {
      return !data.length
    } else if (currentStep === STEPS.SET_PASSWORD) {
      return !password.length
    }

    return false
  }

  submitModal = () => {
    const { setImportKeystoreAccountCurrentStep, currentStep } = this.props

    setImportKeystoreAccountCurrentStep(currentStep)
  }

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
}

export default ImportKeystoreAccountModal
