import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

class ImportKeysModal extends Component {
  render() {
    const { closeImportKeysModal, keys } = this.props

    return (
      <JbModal
        closeModal={closeImportKeysModal}
        name='import-keys'
        header={'Import Keys'}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keys.isImportKeysModalOpen}
      />
    )
  }

  renderBody() {
    return 'Import Keys Body'
  }

  renderFooter() {
    return 'Import Keys Footer'
  }
}

ImportKeysModal.propTypes = {
  closeImportKeysModal: PropTypes.func.isRequired,
  setImportKeysData: PropTypes.func.isRequired,
  setImportKeysPincode: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    importKeysData: PropTypes.shape({
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
      data: PropTypes.string.isRequired,
      pincode: PropTypes.string.isRequired,
    }).isRequired,
    isImportKeysModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ImportKeysModal
