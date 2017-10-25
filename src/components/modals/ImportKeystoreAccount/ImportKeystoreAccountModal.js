import React from 'react'
import PropTypes from 'prop-types'
import Keystore from 'jwallet-web-keystore'

import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import { DerivationPath, Expandable, PasswordField } from 'components'
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
      accountData: {},
    }
  }

  componentWillMount() {
    this.updateStep(1)
  }

  componentWillReceiveProps(nextProps) {
    const { currentStep, totalSteps } = this.props

    if (currentStep !== nextProps.currentStep) {
      this.setState({ topLineFullness: `${100 * (nextProps.currentStep / totalSteps)}%` })
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
    return (
      <div>
        {this.renderData(false)}
        {this.renderDerivationPathOptions()}
      </div>
    )
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

  renderData = (editable = true) => {
    const fieldName = 'data'

    return (
      <JTextInput
        onValueChange={this.props.setImportKeystoreAccountData}
        name='import-keystore-account-data'
        placeholder='Address, private key, mnemonic, BIP32 xpub'
        value={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        editable={editable}
        multiline
      />
    )
  }

  renderDerivationPathOptions = () => {
    const { setImportKeystoreAccountCustomDerivationPath, knownDerivationPath } = this.props
    const fieldName = 'customDerivationPath'

    return (
      <Expandable>
        <DerivationPath
          setKnownDerivationPath={this.setKnownDerivationPath}
          setCustomDerivationPath={setImportKeystoreAccountCustomDerivationPath}
          knownDerivationPath={knownDerivationPath}
          customDerivationPath={this.props[fieldName]}
          errorMessage={this.getInvalidFieldMessage(fieldName)}
        />
      </Expandable>
    )
  }

  renderPasswordField = (isCreating, isInitialized) => {
    const { setImportKeystoreAccountPassword } = this.props
    const fieldName = 'password'

    const passwordProps = {
      errorMessage: this.getInvalidFieldMessage(fieldName),
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
        editable={!isCreating}
        secureTextEntry
      />
    )
  }

  renderFooter = () => {
    const { currentStep, isCreating } = this.props

    return (
      <JModalButton
        onPress={this.goToNextStep}
        name={'import-keystore-account'}
        title={this.getButtonTitle(currentStep)}
        disabled={this.isModalButtonDisabled(currentStep)}
        isLoading={isCreating}
      />
    )
  }

  getButtonTitle = (currentStep) => {
    const title = [
      'Continue',
      'Continue',
      'Save',
      this.props.isInitialized ? 'OK' : 'I understood',
    ]

    return title[currentStep - 1]
  }

  getAlert = (nextStep) => {
    const { isInitialized } = this.props

    const alerts = [
      'Please input data for your key. It will be stored only in your browser.',
      'Now you can set custom options for keys derivation from your mnemonic.',
      // if keystore already initialised no need to show this message
      isInitialized
        ? 'Please input your password'
        : 'It\'s time to create a secure password for your wallet.',
      isInitialized
        ? 'Your key has been successfully imported'
        : 'Excellent! Keep your password in a safe place. Without it, ' +
          'you will not be able to use jWallet.',
    ]

    return alerts[nextStep - 1]
  }

  goToNextStep = () => {
    switch (this.props.currentStep) {
      case DATA_STEP:
        return this.getDataType()
      case MNEMONIC_OPTIONS_STEP:
        return this.checkMnemonicOptions()
      case SET_PASSWORD_STEP:
        return this.createKeystoreAccount(this.props.isInitialized)
      case SUCCESS_STEP:
        return this.resetModal()
      default:
        return null
    }
  }

  getDataType = () => {
    const { data } = this.props
    const newAccountData = { type: null }

    if (Keystore.isMnemonicValid(data)) {
      newAccountData.type = 'mnemonic'
      newAccountData.isReadOnly = false
      newAccountData.mnemonic = data
    } else if (Keystore.isBip32XPublicKeyValid(data)) {
      newAccountData.type = 'mnemonic'
      newAccountData.isReadOnly = true
      newAccountData.bip32XPublicKey = data
    } else if (Keystore.isHexStringValid(data, 64)) {
      newAccountData.type = 'address'
      newAccountData.isReadOnly = false
      newAccountData.privateKey = data
    } else if (Keystore.isHexStringValid(data, 40)) {
      newAccountData.type = 'address'
      newAccountData.isReadOnly = true
      newAccountData.address = data
    } else {
      this.props.setImportKeystoreAccountInvalidField('data', 'Please input correct data to import')

      return this.shake()
    }

    this.setState({ accountData: newAccountData })

    const isMnemonic = ((newAccountData.type === 'mnemonic') && (!newAccountData.isReadOnly))

    if (isMnemonic) {
      return this.updateStep(MNEMONIC_OPTIONS_STEP)
    }

    return this.updateStep(SET_PASSWORD_STEP)
  }

  checkMnemonicOptions = () => {
    this.updateStep(SET_PASSWORD_STEP)
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

    const {
      createKeystoreAccount,
      password,
      knownDerivationPath,
      customDerivationPath,
    } = this.props

    const derivationPath = customDerivationPath.length ? customDerivationPath : knownDerivationPath
    const NewKeystoreAccountData = { ...this.state.accountData, password, derivationPath }

    return createKeystoreAccount(NewKeystoreAccountData, this.onSuccessfulCreate, this.onFailCreate)
  }

  onSuccessfulCreate = () => this.updateStep(SUCCESS_STEP)

  onFailCreate = (err) => {
    this.shake()
    this.props.setImportKeystoreAccountInvalidField('password', err.message)
  }

  isModalButtonDisabled = (currentStep) => {
    const { data, password } = this.props

    if (currentStep === DATA_STEP) {
      return !data.length
    } else if (currentStep === SET_PASSWORD_STEP) {
      return !password.length
    }

    return false
  }

  checkPasswordConfirm = () => {
    const { setImportKeystoreAccountInvalidField, password, passwordConfirm } = this.props

    const isPasswordValid = this.testPassword(password)
    const isPasswordMatch = (password === passwordConfirm)

    if (!isPasswordMatch) {
      setImportKeystoreAccountInvalidField('passwordConfirm', 'Password should match')
    }

    return (isPasswordValid && isPasswordMatch)
  }

  testPassword = (password) => {
    const error = Keystore.testPassword(password).errors[0]

    if (error) {
      this.props.setImportKeystoreAccountInvalidField('password', error)
    }

    return !error
  }

  setKnownDerivationPath = p => () => this.props.setImportKeystoreAccountKnownDerivationPath(p)

  closeModal = () => {
    const { closeImportKeystoreAccountModal, onClose } = this.props

    if (onClose) {
      onClose()
    }

    closeImportKeystoreAccountModal()
  }

  resetModal = () => {
    this.closeModal()
    this.props.clearImportKeystoreAccountData()
    this.updateStep(DATA_STEP)
    this.setState({ accountData: {} })
  }

  submitModal = event => handleEnterKeyPress(this.goToNextStep)(event)
}

ImportKeystoreAccountModal.propTypes = {
  closeImportKeystoreAccountModal: PropTypes.func.isRequired,
  setImportKeystoreAccountData: PropTypes.func.isRequired,
  setImportKeystoreAccountPassword: PropTypes.func.isRequired,
  setImportKeystoreAccountPasswordConfirm: PropTypes.func.isRequired,
  setImportKeystoreAccountKnownDerivationPath: PropTypes.func.isRequired,
  setImportKeystoreAccountCustomDerivationPath: PropTypes.func.isRequired,
  setImportKeystoreAccountCurrentStep: PropTypes.func.isRequired,
  setImportKeystoreAccountAlert: PropTypes.func.isRequired,
  setImportKeystoreAccountInvalidField: PropTypes.func.isRequired,
  clearImportKeystoreAccountData: PropTypes.func.isRequired,
  createKeystoreAccount: PropTypes.func.isRequired,
  invalidFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  data: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  knownDerivationPath: PropTypes.string.isRequired,
  customDerivationPath: PropTypes.string.isRequired,
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
