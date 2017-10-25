import React from 'react'
import PropTypes from 'prop-types'
import Keystore from 'jwallet-web-keystore'

import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import PasswordField from 'components/PasswordField'
import { JModal, JModalButton, JModalImage, JTextInput } from 'components/base'

const FIRST_STEP = 1
const BEFORE_MNEMONIC_STEP = 2
const SAVE_MNEMONIC_STEP = 3
const CHECK_MNEMONIC_STEP = 4
const BEFORE_PASSWORD_STEP = 5
const SET_PASSWORD_STEP = 6

class NewKeystoreAccountModal extends JModal {
  constructor(props) {
    super(props)

    const { currentStep, totalSteps } = props

    this.state = {
      name: 'new-keystore-account',
      topLineFullness: `${100 * (currentStep / totalSteps)}%`,
    }
  }

  componentWillMount() {
    if (!this.props.isInitialized) {
      return this.updateStep(FIRST_STEP)
    }

    // start from mnemonic step if keystore already initialized
    return this.generateMnemonic()
  }

  componentWillReceiveProps(nextProps) {
    const { currentStep, totalSteps } = this.props

    if (currentStep !== nextProps.currentStep) {
      this.setState({ topLineFullness: `${100 * (nextProps.currentStep / totalSteps)}%` })
    }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Create new key'}</div>
  }

  renderBody = () => {
    return this[`renderStep${this.props.currentStep}`]()
  }

  renderStep1 = () => {
    return <JModalImage name='rocket' />
  }

  renderStep2 = () => {
    return <JModalImage name='plane' />
  }

  renderStep3 = () => {
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

  renderStep4 = () => {
    const { setNewKeystoreAccountMnemonicConfirm } = this.props
    const fieldName = 'mnemonicConfirm'

    return (
      <JTextInput
        onValueChange={setNewKeystoreAccountMnemonicConfirm}
        name='new-keystore-account-mnemonic-confirm'
        placeholder='Mnemonic'
        value={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        successMessage={this.getValidFieldMessage(fieldName)}
        editable
        multiline
      />
    )
  }

  renderStep5 = () => {
    return <JModalImage name='paper-plane' />
  }

  renderStep6 = () => {
    const { isCreating, isInitialized } = this.props

    return (
      <div>
        {this.renderPasswordField(isCreating, isInitialized)}
        {this.renderPasswordConfirmField(isCreating, isInitialized)}
      </div>
    )
  }

  renderFooter = () => {
    const { currentStep, isCreating } = this.props

    return (
      <JModalButton
        onPress={this.goToNextStep}
        name={'new-keystore-account'}
        iconName={this.getButtonIconName(currentStep)}
        title={this.getButtonTitle(currentStep)}
        disabled={this.isModalButtonDisabled(currentStep)}
        isLoading={isCreating}
      />
    )
  }

  renderPasswordField = (isCreating, isInitialized) => {
    const fieldName = 'password'
    const { setNewKeystoreAccountPassword } = this.props

    const passwordProps = {
      errorMessage: this.getInvalidFieldMessage(fieldName),
      successMessage: this.getValidFieldMessage(fieldName),
      editable: !isCreating,
    }

    if (isInitialized) {
      return (
        <JTextInput
          {...passwordProps}
          onValueChange={setNewKeystoreAccountPassword}
          name='new-keystore-account-password'
          placeholder='Password'
          value={this.props[fieldName]}
          secureTextEntry
        />
      )
    }

    return (
      <PasswordField
        {...passwordProps}
        onPasswordChange={setNewKeystoreAccountPassword}
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
        onValueChange={this.props.setNewKeystoreAccountPasswordConfirm}
        name='new-keystore-account-password-confirm'
        placeholder='Confirm Password'
        value={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        successMessage={this.getValidFieldMessage(fieldName)}
        editable={!isCreating}
        secureTextEntry
      />
    )
  }

  getButtonTitle = (currentStep) => {
    const title = ['I understood', 'I understood', 'Save as TXT', 'Confirm', 'I understood', 'Save']

    return title[currentStep - 1]
  }

  getButtonIconName = (currentStep) => {
    return (currentStep === SAVE_MNEMONIC_STEP) ? 'txt' : ''
  }

  getAlert = (nextStep) => {
    const alerts = [
      'Anyone who has access to your passphrase can spend your money.',
      'Screenshots are not secure. ' +
      'If you save a screenshot, it can be viewed by other applications.',
      'Save your passphrase and move it to a safe place, in the next step we will check it.',
      'Let\'s check your word combination. Enter it in the box below.',
      'Excellent! Keep your passphrase in a safe place. Without it, ' +
      'access to your account may be lost forever.',
      // if keystore already initialised no need to show this message
      this.props.isInitialized
        ? 'Please input your password'
        : 'It\'s time to create a secure password for your wallet.',
    ]

    return alerts[nextStep - 1]
  }

  goToNextStep = () => {
    switch (this.props.currentStep) {
      case FIRST_STEP:
        return this.updateStep(BEFORE_MNEMONIC_STEP)
      case BEFORE_MNEMONIC_STEP:
        return this.generateMnemonic()
      case SAVE_MNEMONIC_STEP:
        return this.saveMnemonicToFile()
      case CHECK_MNEMONIC_STEP:
        return this.checkMnemonicConfirm()
      case BEFORE_PASSWORD_STEP:
        return this.updateStep(SET_PASSWORD_STEP)
      case SET_PASSWORD_STEP:
        return this.createKeystoreAccount()
      default:
        return null
    }
  }

  updateStep = (nextStep) => {
    const { setNewKeystoreAccountCurrentStep, setNewKeystoreAccountAlert } = this.props

    setNewKeystoreAccountAlert(this.getAlert(nextStep))
    setNewKeystoreAccountCurrentStep(nextStep)
  }

  generateMnemonic = () => {
    this.props.setNewKeystoreAccountMnemonic(Keystore.generateMnemonic().toString())

    return this.updateStep(SAVE_MNEMONIC_STEP)
  }

  saveMnemonicToFile = () => {
    const { saveMnemonicToFile, mnemonic } = this.props

    saveMnemonicToFile(mnemonic, this.updateStep(CHECK_MNEMONIC_STEP))
  }

  createKeystoreAccount = () => {
    const { createKeystoreAccount, password, mnemonic, isInitialized } = this.props

    if (!(isInitialized || this.checkPasswordConfirm())) {
      return this.shake()
    }

    const NewKeystoreAccountData = { type: 'mnemonic', password, mnemonic }

    return createKeystoreAccount(NewKeystoreAccountData, this.onSuccessfulCreate, this.onFailCreate)
  }

  onSuccessfulCreate = () => {
    this.closeModal()
    this.generateMnemonic()
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
    const {
      setNewKeystoreAccountInvalidField,
      mnemonic,
      mnemonicConfirm,
      isInitialized,
    } = this.props

    if (mnemonic === mnemonicConfirm) {
      return this.updateStep(isInitialized ? SET_PASSWORD_STEP : BEFORE_PASSWORD_STEP)
    }

    setNewKeystoreAccountInvalidField('mnemonicConfirm', 'Mnemonic should match')

    return this.shake()
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
    const { closeNewKeystoreAccountModal, onClose } = this.props

    if (onClose) {
      onClose()
    }

    closeNewKeystoreAccountModal()
  }

  submitModal = (event) => {
    const { currentStep, totalSteps } = this.props

    if (currentStep === totalSteps) {
      return handleEnterKeyPress(this.createKeystoreAccount)(event)
    }

    return null
  }
}

NewKeystoreAccountModal.propTypes = {
  closeNewKeystoreAccountModal: PropTypes.func.isRequired,
  setNewKeystoreAccountMnemonic: PropTypes.func.isRequired,
  setNewKeystoreAccountMnemonicConfirm: PropTypes.func.isRequired,
  setNewKeystoreAccountPassword: PropTypes.func.isRequired,
  setNewKeystoreAccountPasswordConfirm: PropTypes.func.isRequired,
  setNewKeystoreAccountCurrentStep: PropTypes.func.isRequired,
  setNewKeystoreAccountValidField: PropTypes.func.isRequired,
  setNewKeystoreAccountInvalidField: PropTypes.func.isRequired,
  setNewKeystoreAccountAlert: PropTypes.func.isRequired,
  saveMnemonicToFile: PropTypes.func.isRequired,
  createKeystoreAccount: PropTypes.func.isRequired,
  validFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  invalidFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  mnemonic: PropTypes.string.isRequired,
  mnemonicConfirm: PropTypes.string.isRequired,
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

NewKeystoreAccountModal.defaultProps = {
  onClose: null,
}

export default NewKeystoreAccountModal
