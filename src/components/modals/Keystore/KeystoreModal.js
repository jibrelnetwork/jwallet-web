import React from 'react'
import PropTypes from 'prop-types'

import JModal from 'components/base/JModal'
import AccountsTable from 'components/AccountsTable'
import KeystoreModalFooter from './Footer'

class KeystoreModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'keystore' }
  }

  closeModal = () => this.props.closeKeystoreModal()

  renderHeader = () => {
    return <div className='modal__title'>{'Keys Manager'}</div>
  }

  renderBody = () => {
    const {
      removeKeystoreAccount,
      setKeystoreAccountName,
      setKeystoreAccountAddress,
      getKeystoreAddressesFromMnemonic,
      setEditAccountName,
      setNewAccountName,
      currentAccount,
      newAccountNameData,
      addressesFromMnemonic,
      accounts,
      sortField,
      sortDirection,
    } = this.props

    return (
      <AccountsTable
        setCurrentKeystoreAccount={this.setCurrentKeystoreAccount}
        removeKeystoreAccount={this.preventEventHandler(removeKeystoreAccount)}
        setKeystoreAccountName={this.preventEventHandler(setKeystoreAccountName)}
        setKeystoreAccountAddress={this.preventEventHandler(setKeystoreAccountAddress)}
        getAddressesFromMnemonic={this.preventEventHandler(getKeystoreAddressesFromMnemonic)}
        sortAccounts={this.sortAccounts}
        openNewDerivationPathModal={this.openNewDerivationPathModal}
        setEditAccountName={this.popoverHandler(setEditAccountName)}
        setNewAccountName={this.setNewAccountName}
        selectAccountName={this.selectAccountName}
        newAccountNameData={newAccountNameData}
        addressesFromMnemonic={addressesFromMnemonic}
        accounts={accounts}
        currentAccountId={currentAccount.id}
        sortField={sortField}
        sortDirection={sortDirection}
      />
    )
  }

  renderFooter = () => {
    return (
      <KeystoreModalFooter
        addNewKeystoreAccount={this.openModal('NewKeystoreAccount')}
        backupKeystore={this.openModal('BackupKeystore')}
        clearKeystore={this.openModal('ClearKeystore')}
        importNewKeystoreAccount={this.openModal('ImportKeystoreAccount')}
        setKeystorePassword={this.openModal('NewKeystorePassword')}
      />
    )
  }

  openModal = modalName => (...args) => {
    const { openKeystoreModal, closeKeystoreModal } = this.props
    const openModalHandler = `open${modalName}Modal`

    this.props[openModalHandler](openKeystoreModal, ...args)
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
    const { setCurrentKeystoreAccount, currentAccount } = this.props

    if (accountId !== currentAccount.id) {
      setCurrentKeystoreAccount(accountId)
    }
  }

  selectAccountName = (event) => {
    event.target.selectionStart = 0
    event.target.selectionEnd = event.target.value.length
  }

  sortAccounts = sortField => (/* event */) => this.props.sortAccounts(sortField)
  openNewDerivationPathModal = (...args) => () => this.openModal('NewDerivationPath')(...args)
}

KeystoreModal.propTypes = {
  setCurrentKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  setKeystoreAccountName: PropTypes.func.isRequired,
  setKeystoreAccountAddress: PropTypes.func.isRequired,
  getKeystoreAddressesFromMnemonic: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  openKeystoreModal: PropTypes.func.isRequired,
  closeKeystoreModal: PropTypes.func.isRequired,
  setEditAccountName: PropTypes.func.isRequired,
  setNewAccountName: PropTypes.func.isRequired,
  openBackupKeystoreModal: PropTypes.func.isRequired,
  openClearKeystoreModal: PropTypes.func.isRequired,
  openImportKeystoreAccountModal: PropTypes.func.isRequired,
  openNewDerivationPathModal: PropTypes.func.isRequired,
  openNewKeystoreAccountModal: PropTypes.func.isRequired,
  openNewKeystorePasswordModal: PropTypes.func.isRequired,
  currentAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    address: PropTypes.string,
    isReadOnly: PropTypes.bool,
  }).isRequired,
  newAccountNameData: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    newAccountName: PropTypes.string.isRequired,
  }).isRequired,
  addressesFromMnemonic: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentIteration: PropTypes.number.isRequired,
  }).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    derivationPath: PropTypes.string,
    address: PropTypes.string,
    isReadOnly: PropTypes.bool,
  })).isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default KeystoreModal
