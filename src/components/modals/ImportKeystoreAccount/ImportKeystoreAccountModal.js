import React from 'react'
import PropTypes from 'prop-types'
import Keystore from 'blockchain-wallet-keystore'

import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import PasswordField from 'components/PasswordField'
import { JModal, JModalButton, JModalImage, JTextInput } from 'components/base'

const DATA_STEP = 1
const MNEMONIC_OPTIONS_STEP = 2
const SET_PASSWORD_STEP = 3
const SUCCESS_STEP = 4

class ImportKeystoreAccountModal extends JModal {
  constructor(props) {
    super(props)

    const { currentStep, totalSteps } = props

    this.state = {
      name: 'import-keystore-account',
      topLineFullness: `${100 * (currentStep / totalSteps)}%`,
      type: null,
    }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Import Key'}</div>
  }

  renderBody = () => {
    return this[`renderStep${this.props.currentStep}`]()
  }

  renderStep1 = () => {
    return this.renderData()
  }

  renderStep2 = () => {
    return this.renderData(false)
  }

  renderStep3 = () => {
    const { isCreating, isInitialized } = this.props

    return (
      <div>
        {this.renderPasswordField(isCreating, isInitialized)}
        {this.renderPasswordConfirmField(isCreating, isInitialized)}
      </div>
    )
  }

  renderStep4 = () => {
    return <JModalImage name='plane' />
  }

  renderData = (editable) => {
    const fieldName = 'data'
    const { setImportKeystoreAccountData } = this.props

    return (
      <JTextInput
        onValueChange={setImportKeystoreAccountData}
        name='import-keystore-account-data'
        placeholder='Address, private key, mnemonic, BIP32 xpub'
        value={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        successMessage={this.getValidFieldMessage(fieldName)}
        editable={editable}
        multiline
      />
    )
  }

  renderPasswordField = (isCreating, isInitialized) => {
    const fieldName = 'password'
    const { setImportKeystoreAccountPassword } = this.props

    const passwordProps = {
      errorMessage: this.getInvalidFieldMessage(fieldName),
      successMessage: this.getValidFieldMessage(fieldName),
      editable: !isCreating,
    }

    if (isInitialized) {
      return (
        <JTextInput
          {...passwordProps}
          onValueChange={setImportKeystoreAccountPassword}
          name='import-keystore-account-password'
          placeholder='Password'
          value={this.props[fieldName]}
          secureTextEntry
        />
      )
    }

    return (
      <PasswordField
        {...passwordProps}
        onPasswordChange={setImportKeystoreAccountPassword}
        password={this.props[fieldName]}
      />
    )
  }

  renderPasswordConfirmField = (isCreating, isInitialized) => {
    if (isInitialized) {
      return null
    }

    const fieldName = 'passwordConfirm'

    return (
      <JTextInput
        onValueChange={this.props.setImportKeystoreAccountPasswordConfirm}
        name='import-keystore-account-password-confirm'
        placeholder='Confirm Password'
        value={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        successMessage={this.getValidFieldMessage(fieldName)}
        editable={!isCreating}
        secureTextEntry
      />
    )
  }

  renderFooter = () => {
    const { currentStep, isCreating } = this.props

    return (
      <JModalButton
        onPress={this.goToNextStep(currentStep)}
        name={'import-key'}
        iconName={'import-key'}
        title={'Import Key'}
        disabled={this.isModalButtonDisabled(currentStep)}
        isLoading={isCreating}
      />
    )
  }

  getButtonTitle = (currentStep) => {
    const title = ['Continue', 'Continue', 'Save', 'I understood']

    return title[currentStep - 1]
  }

  getAlert = (nextStep) => {
    const alerts = [
      'Please input data for your key. It will be stored only in your browser.',
      'Now you can set custom options for keys derivation from your mnemonic.',
      // if keystore already initialised no need to show this message
      this.props.isInitialized ? '' : 'It\'s time to create a secure password for your wallet.',
      'Excellent! Keep your password in a safe place. Without it, ' +
      'you will not be able to use jWallet.',
    ]

    return alerts[nextStep - 1]
  }

  goToNextStep = currentStep => () => {
    const { data, totalSteps, isInitialized } = this.props
    const nextStep = currentStep + 1

    const isDataStep = (currentStep === DATA_STEP)
    const isMnemonicStep = (currentStep === MNEMONIC_OPTIONS_STEP)
    const isPasswordStep = (currentStep === SET_PASSWORD_STEP)

    if (isDataStep) {
      this.getDataType()
    } else if (isMnemonicStep) {
      return this.checkMnemonicOptions()
    } else if (isPasswordStep) {
      return this.createKeystoreAccount(isInitialized)
    } else if (nextStep > totalSteps) {
      return null
    }

    return this.updateStep(nextStep)
  }

  updateStep = (nextStep) => {
    const { setImportKeystoreAccountCurrentStep, setImportKeystoreAccountAlert } = this.props

    setImportKeystoreAccountAlert(this.getAlert(nextStep))
    setImportKeystoreAccountCurrentStep(nextStep)
  }

  createKeystoreAccount = (isInitialized = false) => {
    if (!(isInitialized || this.checkPasswordConfirm())) {
      return this.shake()
    }

    const { createKeystoreAccount, password, mnemonic } = this.props
    const NewKeystoreAccountData = { type: 'mnemonic', password, mnemonic }

    return createKeystoreAccount(NewKeystoreAccountData, this.onSuccessfulCreate, this.onFailCreate)
  }

  onSuccessfulCreate = () => {
    this.closeModal()
    this.goToMnemonicStep()
  }

  onFailCreate = (err) => {
    this.shake()
    this.props.setNewKeystoreAccountInvalidField('password', err.message)
  }

  isModalButtonDisabled = (currentStep) => {
    const { password, mnemonicConfirm } = this.props

    if (currentStep === CHECK_MNEMONIC_STEP) {
      return !mnemonicConfirm.length
    } else if (currentStep === SET_PASSWORD_STEP) {
      return !password.length
    }

    return false
  }

  checkMnemonicConfirm = () => {
    const { setNewKeystoreAccountInvalidField, mnemonic, mnemonicConfirm } = this.props
    const isMnemonicMatch = (mnemonic === mnemonicConfirm)

    if (!isMnemonicMatch) {
      setNewKeystoreAccountInvalidField('mnemonicConfirm', 'Mnemonic should match')
    }

    return isMnemonicMatch
  }

  checkPasswordConfirm = () => {
    const {
      setNewKeystoreAccountValidField,
      setNewKeystoreAccountInvalidField,
      password,
      passwordConfirm,
    } = this.props

    const isPasswordValid = this.testPassword(password)
    const isPasswordMatch = (password === passwordConfirm)

    if (!isPasswordMatch) {
      setNewKeystoreAccountInvalidField('passwordConfirm', 'Password should match')
    } else {
      setNewKeystoreAccountValidField('passwordConfirm', ' ')
    }

    return (isPasswordValid && isPasswordMatch)
  }

  testPassword = (password) => {
    const error = Keystore.testPassword(password).errors[0]

    if (error) {
      this.props.setNewKeystoreAccountInvalidField('password', error)
    }

    return !error
  }

  closeModal = () => {
    const { closeImportKeystoreAccountModal, onClose } = this.props

    if (onClose) {
      onClose()
    }

    closeImportKeystoreAccountModal()
  }

  submitModal = (event) => {
    const { currentStep, totalSteps, isInitialized } = this.props

    if (currentStep === totalSteps) {
      return handleEnterKeyPress(this.createKeystoreAccount, [isInitialized])(event)
    }

    return null
  }

  isModalButtonDisabled = () => (this.props.invalidFields.length > 0)
}

ImportKeystoreAccountModal.propTypes = {
  closeImportKeystoreAccountModal: PropTypes.func.isRequired,
  setImportKeystoreAccountData: PropTypes.func.isRequired,
  setImportKeystoreAccountPassword: PropTypes.func.isRequired,
  setImportKeystoreAccountPasswordConfirm: PropTypes.func.isRequired,
  createKeystoreAccount: PropTypes.func.isRequired,
  validFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  invalidFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  disabledFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  alert: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

ImportKeystoreAccountModal.defaultProps = {
  onClose: null,
}

export default ImportKeystoreAccountModal
