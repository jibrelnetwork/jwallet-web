import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

class NewKeysModal extends Component {
  render() {
    const { closeNewKeysModal, keys } = this.props

    return (
      <JbModal
        closeModal={closeNewKeysModal}
        name='new-keys'
        header={'New Keys'}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keys.isNewKeysModalOpen}
      />
    )
  }

  renderBody = () => {
    return 'New Keys Body'
  }

  renderFooter = () => {
    return 'New Keys Footer'
  }
}

NewKeysModal.propTypes = {
  closeNewKeysModal: PropTypes.func.isRequired,
  setNewKeysMnemonic: PropTypes.func.isRequired,
  saveNewKeysAsTXT: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    newKeysData: PropTypes.shape({
      validFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })).isRequired,
      invalidFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })).isRequired,
      disabledFields: PropTypes.arrayOf(PropTypes.string).isRequired,
      alert: PropTypes.string.isRequired,
      mnemonic: PropTypes.string.isRequired,
    }).isRequired,
    isNewKeysModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default NewKeysModal
