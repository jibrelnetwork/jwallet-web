import React from 'react'
import PropTypes from 'prop-types'

import { JModal, JModalButton } from 'components/base'

class ClearKeystoreModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'clear-keystore' }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Clear Keystore'}</div>
  }

  renderBody = () => {
    return null
  }

  renderFooter = () => {
    return <JModalButton onPress={this.submitModal} name={'clear-keystore'} title={'Confirm'} />
  }

  closeModal = () => {
    const { closeClearKeystoreModal, onClose } = this.props

    if (onClose) {
      onClose()
    }

    closeClearKeystoreModal()
  }

  submitModal = () => {
    const { closeClearKeystoreModal, removeKeystoreAccounts } = this.props

    removeKeystoreAccounts(closeClearKeystoreModal)
  }
}

ClearKeystoreModal.propTypes = {
  closeClearKeystoreModal: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  alert: PropTypes.string,
}

ClearKeystoreModal.defaultProps = {
  onClose: null,
  alert: 'Please confirm that you really want to remove all your keys',
}

export default ClearKeystoreModal
