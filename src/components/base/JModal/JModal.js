import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'config'

import { JModalAlert, JIcon } from 'components/base'

import Appearable from 'components/Appearable'

class JModal extends Appearable {
  componentWillMount() {
    this.setState({ timeout: config.modalOpeningClosingTimeout })
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = this.props

    if (nextProps.isOpen) {
      this.open(!isOpen)
    } else {
      this.close(isOpen)
    }
  }

  render() {
    const { closeModal, name, isShake } = this.props
    const { opening, closing } = this.state

    if (!this.isOpen()) {
      return null
    }

    let modalClassName = `modal modal--${name}`
    let modalOverlayClassName = 'modal__overlay'

    if (isShake) {
      modalClassName = `${modalClassName} modal--shake`
    } else if (opening) {
      modalClassName = `${modalClassName} modal--opening`
      modalOverlayClassName = `${modalOverlayClassName} modal__overlay--opening`
    } else if (closing) {
      modalClassName = `${modalClassName} modal--closing`
      modalOverlayClassName = `${modalOverlayClassName} modal__overlay--closing`
    }

    return (
      <div className='modal-wrap'>
        <div className={modalOverlayClassName} onClick={closeModal} />
        <div className={modalClassName}>{this.renderModalContent()}</div>
      </div>
    )
  }

  renderModalContent = () => {
    return (
      <div className='modal__content'>
        {this.renderModalHeader()}
        {this.renderModalAlert()}
        {this.renderModalBody()}
        {this.renderModalFooter()}
      </div>
    )
  }

  renderModalHeader = () => {
    const { closeModal, header } = this.props

    return (
      <div className='modal__header'>
        {header}
        <JIcon name='close' small className='modal__close' onClick={closeModal} />
      </div>
    )
  }

  renderModalAlert = () => {
    const { alert } = this.props

    return <div className='modal__alert'>{alert.length ? <JModalAlert text={alert} /> : null}</div>
  }

  renderModalBody = () => {
    const { submitModal, body } = this.props

    return <div className='modal__body' onKeyPress={submitModal}>{body}</div>
  }

  renderModalFooter = () => {
    return <div className='modal__footer'>{this.props.footer}</div>
  }
}

JModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  submitModal: PropTypes.func,
  alert: PropTypes.string,
  isOpen: PropTypes.bool,
  isShake: PropTypes.bool,
}

JModal.defaultProps = {
  submitModal: () => {},
  alert: '',
  isOpen: false,
  isShake: false,
}

export default JModal
