import React from 'react'
import PropTypes from 'prop-types'

import SubmitModal from 'components/SubmitModal'

class AlphaWarningModal extends SubmitModal {
  componentDidMount() {
    this.props.startTimer()
  }

  renderModalBody = () => {
    return (
      <div className='alpha-warning'>
        <div className='modal-image modal-image--warning' />
        <div className='alpha-warning__message'>{i18n('modals.alphaWarning.message')}</div>
      </div>
    )
  }

  closeModal = () => {}
  submitModal = () => this.props.closeModal()
  isModalButtonDisabled = () => (this.props.seconds > 0)
}

AlphaWarningModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  modalName: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default AlphaWarningModal
