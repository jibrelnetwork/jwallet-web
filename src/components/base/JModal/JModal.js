import React from 'react'
import PropTypes from 'prop-types'

import config from 'config'

import Appearable from 'components/Appearable'

import JModalOverlay from './Overlay'
import JModalContent from './Content'

class JModal extends Appearable {
  componentWillReceiveProps({ isOpen }) {
    this.toggleModal(isOpen)
    this.scrollToTop(isOpen)
  }

  render() {
    const { opening, closing, isShake } = this.state

    if (!this.isOpen()) {
      return null
    }

    let modalClassName = `modal modal--${this.props.modalName}`
    let modalOverlayClassName = 'modal-overlay'

    if (isShake) {
      modalClassName = `${modalClassName} shake`
    } else if (opening) {
      modalClassName = `${modalClassName} modal--opening`
      modalOverlayClassName = `${modalOverlayClassName} modal-overlay--opening`
    } else if (closing) {
      modalClassName = `${modalClassName} modal--closing`
      modalOverlayClassName = `${modalOverlayClassName} modal-overlay--closing`
    }

    return (
      <div className='modal-wrap'>
        <JModalOverlay className={modalOverlayClassName} closeModal={this._closeModal} />
        <JModalContent
          closeModal={this._closeModal}
          header={this.renderHeader()}
          body={this.renderBody()}
          footer={this.renderFooter()}
          className={modalClassName}
        />
      </div>
    )
  }

  toggleModal = (isAboutToOpen) => {
    const isClosed = !this.props.isOpen

    if (isAboutToOpen) {
      this.open(isClosed)
    } else {
      this.close(!isClosed)
    }
  }

  scrollToTop = (isAboutToOpen) => {
    const isClosed = !this.props.isOpen

    if (isClosed && isAboutToOpen) {
      window.scrollTo(0, 0)
    }
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
}

JModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  appearableTimeout: PropTypes.number,
  some: PropTypes.string,
}

JModal.defaultProps = {
  ...Appearable.defaultProps,
  appearableTimeout: config.modalOpeningClosingTimeout,
  some: 'hello',
}

export default JModal
