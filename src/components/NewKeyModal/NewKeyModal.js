import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Keystore from 'blockchain-wallet-keystore'

import config from 'config'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import PasswordField from 'components/PasswordField'
import { JModal, JModalButton, JModalImage, JTextInput } from 'components/base'

const BEFORE_MNEMONIC_STEP = 2
const SAVE_MNEMONIC_STEP = 3
const CHECK_MNEMONIC_STEP = 4
const SET_PASSWORD_STEP = 6

class NewKeyModal extends Component {
  constructor(props) {
    super(props)
    this.state = { isShake: false }
  }

  render() {
    const { createKeystoreAccount, keystore } = this.props
    const { alert, currentStep, totalSteps } = keystore.newKeyData
    const submit = (currentStep === totalSteps) ? handleEnterKeyPress(createKeystoreAccount) : null

    return (
      <JModal
        closeModal={this.closeNewKeyModal}
        submitModal={submit}
        name='new-key'
        alert={alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        topLineFullness={`${100 * (currentStep / totalSteps)}%`}
        isOpen={keystore.isNewKeyModalOpen}
        isShake={this.state.isShake}
      />
    )
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Create new key'}</div>
  }

  renderBody = () => {
    return this[`renderStep${this.props.keystore.newKeyData.currentStep}`]()
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
        name='new-key-mnemonic'
        placeholder='Mnemonic'
        value={this.props.keystore.newKeyData.mnemonic}
        editable
        readOnly
        multiline
        preventCopy
        unselectable
      />
    )
  }

  renderStep4 = () => {
    const { setNewKeyMnemonicConfirm, keystore } = this.props

    return (
      <JTextInput
        onValueChange={setNewKeyMnemonicConfirm}
        name='new-key-mnemonic-confirm'
        placeholder='Mnemonic'
        value={keystore.newKeyData.mnemonicConfirm}
        errorMessage={this.getInvalidFieldMessage('mnemonicConfirm')}
        successMessage={this.getValidFieldMessage('mnemonicConfirm')}
        editable
        multiline
      />
    )
  }

  renderStep5 = () => {
    return <JModalImage name='paper-plane' />
  }

  renderStep6 = () => {
    const { setNewKeyPassword, setNewKeyPasswordConfirm, keystore } = this.props
    const { newKeyData, isCreating } = keystore
    const { password, passwordConfirm } = newKeyData

    return (
      <div>
        <PasswordField
          onPasswordChange={setNewKeyPassword}
          password={password}
          errorMessage={this.getInvalidFieldMessage('password')}
          successMessage={this.getValidFieldMessage('password')}
          editable={!isCreating}
        />
        <JTextInput
          onValueChange={setNewKeyPasswordConfirm}
          name='new-key-password-confirm'
          placeholder='Confirm Password'
          value={passwordConfirm}
          errorMessage={this.getInvalidFieldMessage('passwordConfirm')}
          successMessage={this.getValidFieldMessage('passwordConfirm')}
          editable={!isCreating}
          secureTextEntry
        />
      </div>
    )
  }

  renderFooter = () => {
    const { newKeyData, isCreating } = this.props.keystore
    const { currentStep } = newKeyData

    return (
      <JModalButton
        onPress={this.goToNextStep(currentStep)}
        name={'new-key'}
        iconName={this.getButtonIconName(currentStep)}
        title={this.getButtonTitle(currentStep)}
        disabled={this.isModalButtonDisabled(currentStep)}
        isLoading={isCreating}
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
      'It\'s time to create a secure password for your wallet.',
    ]

    return alerts[nextStep - 1]
  }

  goToNextStep = currentStep => (/* event */) => {
    const { setNewKeyMnemonic, keystore } = this.props
    const { mnemonic, totalSteps } = keystore.newKeyData
    const nextStep = currentStep + 1

    const isBeforeSaveMnemonicStep = (currentStep === BEFORE_MNEMONIC_STEP)
    const isSaveMnemonicStep = (currentStep === SAVE_MNEMONIC_STEP)
    const isCheckMnemonicStep = (currentStep === CHECK_MNEMONIC_STEP)
    const isSetPasswordStep = (currentStep === SET_PASSWORD_STEP)

    if (isBeforeSaveMnemonicStep) {
      setNewKeyMnemonic(Keystore.generateMnemonic().toString())
    } else if (isSaveMnemonicStep) {
      return this.saveMnemonicToFile(mnemonic)
    } else if (isCheckMnemonicStep && !this.checkMnemonicConfirm()) {
      this.shake()

      return null
    } else if (isSetPasswordStep) {
      if (!this.checkPasswordConfirm()) {
        return this.shake()
      }

      return this.createKeystoreAccount()
    } else if (nextStep > totalSteps) {
      return null
    }

    return this.updateStep(nextStep)
  }

  updateStep = (nextStep) => {
    const { setNewKeyCurrentStep, setNewKeyAlert } = this.props

    setNewKeyAlert(this.getAlert(nextStep))
    setNewKeyCurrentStep(nextStep)
  }

  saveMnemonicToFile = (mnemonic) => {
    this.props.saveMnemonicToFile(mnemonic, this.updateStep(CHECK_MNEMONIC_STEP))
  }

  createKeystoreAccount = () => {
    const { closeNewKeyModal, createKeystoreAccount, keystore } = this.props

    const { password, mnemonic } = keystore.newKeyData

    return createKeystoreAccount({ type: 'mnemonic', password, mnemonic }, closeNewKeyModal)
  }

  isModalButtonDisabled = (currentStep) => {
    const { password, mnemonicConfirm } = this.props.keystore.newKeyData

    if (currentStep === CHECK_MNEMONIC_STEP) {
      return !mnemonicConfirm.length
    } else if (currentStep === SET_PASSWORD_STEP) {
      return !password.length
    }

    return false
  }

  checkMnemonicConfirm = () => {
    const { setNewKeyInvalidField, keystore } = this.props
    const { mnemonic, mnemonicConfirm } = keystore.newKeyData
    const isMnemonicMatch = (mnemonic === mnemonicConfirm)

    if (!isMnemonicMatch) {
      setNewKeyInvalidField('mnemonicConfirm', 'Mnemonic should match')
    }

    return isMnemonicMatch
  }

  checkPasswordConfirm = () => {
    const { setNewKeyValidField, setNewKeyInvalidField, keystore } = this.props
    const { password, passwordConfirm } = keystore.newKeyData
    const isPasswordValid = this.testPassword(password)
    const isPasswordMatch = (password === passwordConfirm)

    if (!isPasswordMatch) {
      setNewKeyInvalidField('passwordConfirm', 'Password should match')
    } else {
      setNewKeyValidField('passwordConfirm', ' ')
    }

    return (isPasswordValid && isPasswordMatch)
  }

  testPassword = (password) => {
    const error = Keystore.testPassword(password).errors[0]

    if (error) {
      this.props.setNewKeyInvalidField('password', error)
    }

    return !error
  }

  shake = () => {
    this.setState({ isShake: true })

    setTimeout(() => {
      this.setState({ isShake: false })
    }, config.modalShakeTimeout)
  }

  closeNewKeyModal = (/* event */) => {
    const { openKeystoreModal, closeNewKeyModal, keystore } = this.props

    if (keystore.showKeystoreModalAfterClose) {
      openKeystoreModal()
    }

    closeNewKeyModal()
  }

  getValidFieldMessage = n => getFieldMessage(this.props.keystore.newKeyData.validFields, n)
  getInvalidFieldMessage = n => getFieldMessage(this.props.keystore.newKeyData.invalidFields, n)
}

NewKeyModal.propTypes = {
  openKeystoreModal: PropTypes.func.isRequired,
  closeNewKeyModal: PropTypes.func.isRequired,
  setNewKeyMnemonic: PropTypes.func.isRequired,
  setNewKeyMnemonicConfirm: PropTypes.func.isRequired,
  setNewKeyPassword: PropTypes.func.isRequired,
  setNewKeyPasswordConfirm: PropTypes.func.isRequired,
  setNewKeyCurrentStep: PropTypes.func.isRequired,
  setNewKeyValidField: PropTypes.func.isRequired,
  setNewKeyInvalidField: PropTypes.func.isRequired,
  setNewKeyAlert: PropTypes.func.isRequired,
  saveMnemonicToFile: PropTypes.func.isRequired,
  createKeystoreAccount: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    newKeyData: PropTypes.shape({
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
      currentStep: PropTypes.number.isRequired,
      totalSteps: PropTypes.number.isRequired,
      alert: PropTypes.string,
    }).isRequired,
    isCreating: PropTypes.bool.isRequired,
    isNewKeyModalOpen: PropTypes.bool.isRequired,
    showKeystoreModalAfterClose: PropTypes.bool.isRequired,
  }).isRequired,
}

export default NewKeyModal
