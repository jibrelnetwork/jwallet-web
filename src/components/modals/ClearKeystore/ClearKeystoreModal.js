import React from 'react'
import PropTypes from 'prop-types'

import SubmitModal from 'components/SubmitModal'

class ClearKeystoreModal extends SubmitModal {
  renderModalBody = () => {
    return ''
  }

  submitModal = () => {
    const { closeClearKeystoreModal, removeKeystoreAccounts } = this.props

    removeKeystoreAccounts(closeClearKeystoreModal)
  }

  isModalButtonDisabled = () => false
  closeModal = () => this.props.closeClearKeystoreModal()
}

ClearKeystoreModal.propTypes = {
  closeClearKeystoreModal: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

ClearKeystoreModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default ClearKeystoreModal
