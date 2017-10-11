import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { JIcon, JModal } from 'components/base'
import Accounts from 'components/Accounts'

class KeystoreModal extends Component {
  render() {
    const { closeKeystoreModal, keystore } = this.props

    return (
      <JModal
        closeModal={closeKeystoreModal}
        name='keystore'
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
      setKeystoreAccountAddress,
      getKeystoreAddressesFromMnemonic,
      setKeystorePassword,
      openDerivationPathModal,
      setEditAccountName,
      setNewAccountName,
      keystore,
    } = this.props

    return (
      <Accounts
        setCurrentKeystoreAccount={this.setCurrentKeystoreAccount}
        removeKeystoreAccount={this.popoverHandler(removeKeystoreAccount)}
        removeKeystoreAccounts={removeKeystoreAccounts}
        setKeystoreAccountName={setKeystoreAccountName}
        setKeystoreAccountAddress={setKeystoreAccountAddress}
        getKeystoreAddressesFromMnemonic={getKeystoreAddressesFromMnemonic}
        setKeystorePassword={setKeystorePassword}
        sortAccounts={this.sortAccounts}
        openDerivationPathModal={this.popoverHandler(openDerivationPathModal)}
        setEditAccountName={this.popoverHandler(setEditAccountName)}
        setNewAccountName={setNewAccountName}
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
  }

  popoverHandler = handler => (...args) => (event) => {
    event.preventDefault()

    handler(...args)

    event.stopPropagation()
  }

  sortAccounts = sortField => (/* event */) => this.props.sortAccounts(sortField)
}

KeystoreModal.propTypes = {
  setCurrentKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
  setKeystoreAccountName: PropTypes.func.isRequired,
  setKeystoreAccountAddress: PropTypes.func.isRequired,
  getKeystoreAddressesFromMnemonic: PropTypes.func.isRequired,
  setKeystorePassword: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  closeKeystoreModal: PropTypes.func.isRequired,
  openNewKeyModal: PropTypes.func.isRequired,
  openImportKeyModal: PropTypes.func.isRequired,
  openBackupKeystoreModal: PropTypes.func.isRequired,
  openDerivationPathModal: PropTypes.func.isRequired,
  setEditAccountName: PropTypes.func.isRequired,
  setNewAccountName: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    newAccountNameData: PropTypes.shape({
      newAccountName: PropTypes.string.isRequired,
      isEditAccountName: PropTypes.bool.isRequired,
    }).isRequired,
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
      derivationPath: PropTypes.string,
      address: PropTypes.string,
      isReadOnly: PropTypes.bool,
    })).isRequired,
    addressesFromMnemonic: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    isKeystoreModalOpen: PropTypes.bool.isRequired,
    isDerivationPathModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default KeystoreModal
