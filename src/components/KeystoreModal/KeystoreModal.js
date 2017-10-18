import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { JLoader, JModal } from 'components/base'
import AccountsTable from 'components/AccountsTable'
import KeystoreModalFooter from './Footer'

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
      openDerivationPathModal,
      setEditAccountName,
      setNewAccountName,
      keystore,
    } = this.props

    return (
      <AccountsTable
        setCurrentKeystoreAccount={this.setCurrentKeystoreAccount}
        removeKeystoreAccount={this.preventEventHandler(removeKeystoreAccount)}
        removeKeystoreAccounts={removeKeystoreAccounts}
        setKeystoreAccountName={this.preventEventHandler(setKeystoreAccountName)}
        setKeystoreAccountAddress={this.preventEventHandler(setKeystoreAccountAddress)}
        getAddressesFromMnemonic={this.preventEventHandler(getKeystoreAddressesFromMnemonic)}
        sortAccounts={this.sortAccounts}
        openDerivationPathModal={this.popoverHandler(openDerivationPathModal)}
        setEditAccountName={this.popoverHandler(setEditAccountName)}
        setNewAccountName={this.setNewAccountName}
        selectAccountName={this.selectAccountName}
        keystore={keystore}
      />
    )
  }

  renderFooter = () => {
    const {
      openNewKeyModal,
      openImportKeyModal,
      openBackupKeystoreModal,
      removeKeystoreAccounts,
    } = this.props

    return (
      <KeystoreModalFooter
        addNewKey={this.openModalHandler(openNewKeyModal)}
        importKey={this.openModalHandler(openImportKeyModal)}
        backupKeystore={this.openModalHandler(openBackupKeystoreModal)}
        setNewKeystorePassword={this.openModal('NewKeystorePassword')}
        removeKeystoreAccounts={removeKeystoreAccounts}
      />
    )
  }

  openModalHandler = handler => (/* event */) => {
    const showKeystoreModalAfterClose = true

    handler(showKeystoreModalAfterClose)
    this.props.closeKeystoreModal()
  }

  openModal = modalName => () => {
    const { openKeystoreModal, closeKeystoreModal } = this.props
    const openModalHandler = `open${modalName}Modal`

    this.props[openModalHandler](openKeystoreModal)
    closeKeystoreModal()
  }

  setNewAccountName = (event) => {
    event.preventDefault()

    this.props.setNewAccountName(event.target.value)

    event.stopPropagation()
  }

  popoverHandler = handler => (...args) => (event) => {
    this.preventEventHandler(handler)(...args)(event)

    // generate click event to hide popover
    document.body.click()
  }

  preventEventHandler = handler => (...args) => (event) => {
    if (event) {
      event.preventDefault()
    }

    handler(...args)

    // stop propagation to omit clicking on account (that will fire unnecessary actions)
    if (event) {
      event.stopPropagation()
    }
  }

  setCurrentKeystoreAccount = accountId => (/* event */) => {
    const { setCurrentKeystoreAccount, keystore } = this.props

    if (accountId !== keystore.currentAccount.id) {
      setCurrentKeystoreAccount(accountId)
    }
  }

  selectAccountName = (event) => {
    event.target.selectionStart = 0
    event.target.selectionEnd = event.target.value.length
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
  sortAccounts: PropTypes.func.isRequired,
  openKeystoreModal: PropTypes.func.isRequired,
  closeKeystoreModal: PropTypes.func.isRequired,
  openNewKeyModal: PropTypes.func.isRequired,
  openImportKeyModal: PropTypes.func.isRequired,
  openBackupKeystoreModal: PropTypes.func.isRequired,
  openDerivationPathModal: PropTypes.func.isRequired,
  setEditAccountName: PropTypes.func.isRequired,
  setNewAccountName: PropTypes.func.isRequired,
  openNewKeystorePasswordModal: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    newAccountNameData: PropTypes.shape({
      accountId: PropTypes.string.isRequired,
      newAccountName: PropTypes.string.isRequired,
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
    addressesFromMnemonic: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
      currentIteration: PropTypes.number.isRequired,
    }).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    isKeystoreModalOpen: PropTypes.bool.isRequired,
    isDerivationPathModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default KeystoreModal
