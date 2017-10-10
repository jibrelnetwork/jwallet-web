import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { JIcon, JModal } from 'components/base'
import AccountsTable from 'components/AccountsTable'

class KeystoreModal extends Component {
  render() {
    const { closeKeystoreModal, keystore } = this.props

    return (
      <JModal
        closeModal={closeKeystoreModal}
        name='keystore-modal'
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keystore.isKeystoreModalOpen}
      />
    )
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Keys manager'}</div>
  }

  renderBody = () => {
    const {
      removeKeystoreAccount,
      removeKeystoreAccounts,
      setKeystoreAccountName,
      setKeystoreAccountDerivationPath,
      setKeystoreAccountAddress,
      getKeystoreAddressesFromMnemonic,
      setKeystorePassword,
      keystore,
    } = this.props

    return (
      <AccountsTable
        setCurrentKeystoreAccount={this.setCurrentKeystoreAccount}
        removeKeystoreAccount={removeKeystoreAccount}
        removeKeystoreAccounts={removeKeystoreAccounts}
        setKeystoreAccountName={setKeystoreAccountName}
        setKeystoreAccountDerivationPath={setKeystoreAccountDerivationPath}
        setKeystoreAccountAddress={setKeystoreAccountAddress}
        getKeystoreAddressesFromMnemonic={getKeystoreAddressesFromMnemonic}
        setKeystorePassword={setKeystorePassword}
        sortAccounts={this.sortAccounts}
        keystore={keystore}
      />
    )
  }

  renderFooter = () => {
    return (
      <div className='keystore-modal-footer clear'>
        <div className='keystore-modal-footer__item pull-left' onClick={this.addNewKey}>
          <JIcon name='small-add' className='keystore-modal-footer__icon' small />
          {'New key'}
        </div>
        <div className='keystore-modal-footer__item pull-left' onClick={this.importKey}>
          <JIcon name='small-import' className='keystore-modal-footer__icon' small />
          {'Import key'}
        </div>
      </div>
    )
  }

  addNewKey = (/* event */) => {
    const { openNewKeyModal, closeKeystoreModal } = this.props
    const showKeystoreModalAfterClose = true

    openNewKeyModal(showKeystoreModalAfterClose)
    closeKeystoreModal()
  }

  importKey = (/* event */) => {
    const { openImportKeyModal, closeKeystoreModal } = this.props
    const showKeystoreModalAfterClose = true

    openImportKeyModal(showKeystoreModalAfterClose)
    closeKeystoreModal()
  }

  setCurrentKeystoreAccount = id => (event) => {
    event.preventDefault()

    this.props.setCurrentKeystoreAccount(id)

    event.stopPropagation()
  }

  sortAccounts = sortField => (/* event */) => this.props.sortAccounts(sortField)
}

KeystoreModal.propTypes = {
  setCurrentKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
  setKeystoreAccountName: PropTypes.func.isRequired,
  setKeystoreAccountDerivationPath: PropTypes.func.isRequired,
  setKeystoreAccountAddress: PropTypes.func.isRequired,
  getKeystoreAddressesFromMnemonic: PropTypes.func.isRequired,
  setKeystorePassword: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  closeKeystoreModal: PropTypes.func.isRequired,
  openNewKeyModal: PropTypes.func.isRequired,
  openImportKeyModal: PropTypes.func.isRequired,
  openBackupKeystoreModal: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    currentAccount: PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      accountName: PropTypes.string.isRequired,
      address: PropTypes.string,
      isReadOnly: PropTypes.bool,
    }).isRequired,
    accounts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      accountName: PropTypes.string.isRequired,
      address: PropTypes.string,
      isReadOnly: PropTypes.bool,
    })).isRequired,
    addressesFromMnemonic: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    isKeystoreModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default KeystoreModal
