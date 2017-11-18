import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

class AddCustomTokenModal extends Component {
  render() {
    const { closeAddCustomTokenModal, accounts } = this.props

    return (
      <JbModal
        closeModal={closeAddCustomTokenModal}
        name='add-custom-token'
        header={'Add custom token'}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={accounts.isAddCustomTokenModalOpen}
      />
    )
  }

  renderBody = () => {
    return 'Import Keys Body'
  }

  renderFooter = () => {
    return 'Import Keys Footer'
  }
}

AddCustomTokenModal.propTypes = {
  closeAddCustomTokenModal: PropTypes.func.isRequired,
  setCustomTokenAddress: PropTypes.func.isRequired,
  setCustomTokenName: PropTypes.func.isRequired,
  setCustomTokenSymbol: PropTypes.func.isRequired,
  setCustomTokenDecimals: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    customTokenData: PropTypes.shape({
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
      address: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      decimals: PropTypes.string.isRequired,
    }).isRequired,
    isAddCustomTokenModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AddCustomTokenModal
