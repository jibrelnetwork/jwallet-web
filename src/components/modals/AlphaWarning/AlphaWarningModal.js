import React from 'react'
import PropTypes from 'prop-types'

import SubmitModal from 'components/SubmitModal'

class AlphaWarningModal extends SubmitModal {
  renderModalBody = () => {
    return (
      <div className='alpha-warning'>
        <div className='modal-image modal-image--warning' />
        <div className='alpha-warning__message'>{i18n('modals.alphaWarning.message')}</div>
      </div>
    )
  }

  submitModal = () => this.closeModal()
  closeModal = () => this.props.closeAlphaWarningModal()
}

AlphaWarningModal.propTypes = {
  closeAlphaWarningModal: PropTypes.func.isRequired,
  modalName: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

AlphaWarningModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default AlphaWarningModal
