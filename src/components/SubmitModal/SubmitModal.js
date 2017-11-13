import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import JModal from 'components/base/JModal'

import SubmitModalAlert from './Alert'
import SubmitModalBody from './Body'
import SubmitModalButton from './Button'
import SubmitModalPasswordButton from './PasswordButton'
import SubmitModalTitle from './Title'
import SubmitModalTopLine from './TopLine'

class SubmitModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { passwordButtonState: SubmitModalPasswordButton.STATES.TITLE }
  }

  componentWillReceiveProps(nextProps) {
    const { invalidFields } = nextProps

    if (this.props.invalidFields !== invalidFields) {
      this.shakeIfInvalidField(invalidFields)
    }

    this.scrollToTop(nextProps)
  }

  shakeIfInvalidField = (invalidFields) => {
    Object.keys(invalidFields).forEach((field) => {
      if (invalidFields[field] && invalidFields[field].length) {
        if (this.props.invalidFields[field] !== invalidFields[field]) {
          this.shake()
        }
      }
    })
  }

  renderBody = () => {
    const { topLineFullness, alert, imageName } = this.props

    return (
      <div onKeyPress={handleEnterKeyPress(this._submitModal)}>
        <SubmitModalTopLine width={topLineFullness} />
        <SubmitModalAlert text={alert} />
        <SubmitModalBody body={this.renderModalBody()} imageName={imageName} />
      </div>
    )
  }

  renderHeader = () => {
    return <SubmitModalTitle title={this.props.modalTitle} />
  }

  renderFooter = () => {
    const { modalName, buttonTitle, iconName, isButtonLoading, buttonType } = this.props

    const buttonProps = {
      iconName,
      onPress: this.submitModal,
      name: modalName,
      title: buttonTitle,
      isLoading: isButtonLoading,
      disabled: (this.isModalButtonDisabled() || this.isInvalidFields()),
    }

    if (buttonType === 'password') {
      const { invalidFields, password } = this.props

      return (
        <SubmitModalPasswordButton
          {...buttonProps}
          setButtonState={this.setPasswordButtonState}
          setPassword={this.setPassword}
          password={password}
          buttonState={this.state.passwordButtonState}
          isError={!!(invalidFields.password && invalidFields.password.length)}
        />
      )
    }

    return <SubmitModalButton {...buttonProps} />
  }

  _submitModal = () => {
    if (this.isModalButtonDisabled()) {
      return null
    }

    if (this.props.buttonType === 'password') {
      return this.setPasswordButtonState(this.state.passwordButtonState)
    }

    return this.submitModal()
  }

  setPasswordButtonState = (passwordButtonState) => {
    const { RESET, TITLE, PASSWORD } = SubmitModalPasswordButton.STATES

    switch (passwordButtonState) {
      case RESET:
        return this.setState({ passwordButtonState: TITLE })
      case TITLE:
        return this.setState({ passwordButtonState: PASSWORD })
      case PASSWORD:
        return this.submitModal()
      default:
        return null
    }
  }

  isInvalidFields = () => {
    const { invalidFields } = this.props

    return !!Object.keys(invalidFields).filter(field => (!isEmpty(invalidFields[field]))).length
  }

  isModalButtonDisabled = () => false
}

SubmitModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  /* optional */
  invalidFields: PropTypes.shape({}),
  buttonType: PropTypes.oneOf(['default', 'password']),
  alert: PropTypes.string,
  topLineFullness: PropTypes.string,
  iconName: PropTypes.string,
  imageName: PropTypes.string,
  password: PropTypes.string,
  isOpen: PropTypes.bool,
  isButtonLoading: PropTypes.bool,
}

SubmitModal.defaultProps = {
  ...JModal.defaultProps,
  invalidFields: {},
  buttonType: 'default',
  alert: '',
  topLineFullness: '',
  iconName: '',
  imageName: '',
  password: '',
  isOpen: false,
  isButtonLoading: false,
}

export default SubmitModal
