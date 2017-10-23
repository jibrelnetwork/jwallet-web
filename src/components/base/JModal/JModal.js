import React from 'react'
import PropTypes from 'prop-types'

import config from 'config'

import getFieldMessage from 'utils/getFieldMessage'

import { JModalAlert, JIcon } from 'components/base'

import Appearable from 'components/Appearable'

class JModal extends Appearable {
  componentWillMount() {
    this.setState({ timeout: config.modalOpeningClosingTimeout })
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props
    const isJustNowOpened = !isOpen && nextProps.isOpen

    if (isJustNowOpened) {
      window.scrollTo(0, 0)
    }

    if (nextProps.isOpen) {
      this.open(!isOpen)
    } else {
      this.close(isOpen)
    }
  }

  render() {
    const { name, opening, closing, isShake } = this.state

    if (!this.isOpen()) {
      return null
    }

    let modalClassName = `modal modal--${name}`
    let modalOverlayClassName = 'modal__overlay'

    if (isShake) {
      modalClassName = `${modalClassName} shake`
    } else if (opening) {
      modalClassName = `${modalClassName} modal--opening`
      modalOverlayClassName = `${modalOverlayClassName} modal__overlay--opening`
    } else if (closing) {
      modalClassName = `${modalClassName} modal--closing`
      modalOverlayClassName = `${modalOverlayClassName} modal__overlay--closing`
    }

    return (
      <div className='modal-wrap'>
        <div className={modalOverlayClassName} onClick={this._closeModal} />
        <div className={modalClassName}>{this.renderModalContent()}</div>
      </div>
    )
  }

  renderModalContent = () => {
    return (
      <div className='modal__content'>
        {this.renderModalHeader()}
        {this.renderModalTopLine()}
        {this.renderModalAlert()}
        {this.renderModalBody()}
        {this.renderModalFooter()}
      </div>
    )
  }

  renderModalHeader = () => {
    return (
      <div className='modal__header'>
        {this.renderHeader()}
        <JIcon name='close' small className='modal__close' onClick={this._closeModal} />
      </div>
    )
  }

  renderModalTopLine = () => {
    const width = this.state.topLineFullness

    if (!(width && width.length)) {
      return null
    }

    return (
      <div className='modal__step-line'>
        <div className='modal__step-line-overlay' style={{ width }} />
      </div>
    )
  }

  renderModalAlert = () => {
    return <JModalAlert text={this.props.alert} />
  }

  renderModalBody = () => {
    return <div className='modal__body' onKeyPress={this.submitModal}>{this.renderBody()}</div>
  }

  renderModalFooter = () => {
    return <div className='modal__footer'>{this.renderFooter()}</div>
  }

  shake = () => {
    this.setState({ isShake: true })

    setTimeout(() => this.setState({ isShake: false }), config.modalShakeTimeout)
  }

  _closeModal = () => {
    const { onClose } = this.props

    if (onClose) {
      onClose()
    }

    this.closeModal()
  }

  isEnabledField = fieldName => (this.props.disabledFields.indexOf(fieldName) === -1)
  getValidFieldMessage = fieldName => getFieldMessage(this.props.validFields, fieldName)
  getInvalidFieldMessage = fieldName => getFieldMessage(this.props.invalidFields, fieldName)
}

JModal.propTypes = {
  onClose: PropTypes.func,
  validFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })),
  invalidFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })),
  disabledFields: PropTypes.arrayOf(PropTypes.string),
  alert: PropTypes.string,
  isOpen: PropTypes.bool,
}

JModal.defaultProps = {
  onClose: null,
  validFields: [],
  invalidFields: [],
  disabledFields: [],
  alert: '',
  isOpen: false,
}

export default JModal
