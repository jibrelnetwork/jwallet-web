import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { base, modals, AuthHeader, JWalletHeader } from 'components'

import 'styles/core.scss'

const { JFooter, JLoader } = base

const {
  BackupKeystoreModal,
  ClearKeystoreModal,
  ConvertFundsModal,
  CurrenciesModal,
  CustomTokenModal,
  ImportKeyStoreAccountModal,
  KeystoreModal,
  NewKeystoreAccountModal,
  NewKeystorePasswordModal,
  ReceiveFundsModal,
  SendFundsModal,
} = modals

class CoreLayout extends Component {
  componentDidMount() {
    const { getKeystoreFromStorage, getNetworksFromStorage, keystore, networks } = this.props

    if (!keystore.accounts.length) {
      getKeystoreFromStorage()
    }

    if (!networks.items.length) {
      getNetworksFromStorage()
    }
  }

  render() {
    const { keystore, location, children } = this.props

    const isAuth = (location.pathname.indexOf('/auth') === 0)

    if (keystore.isLoading || !children) {
      return <JLoader fixed />
    }

    return (
      <div className={`container-wrap container-wrap--${isAuth ? 'auth' : 'jwallet'}`}>
        <div className={`container ${this.isAnyModalOpened() ? 'container--modal-open' : ''}`}>
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderFooter()}
        </div>
        {this.renderModals()}
      </div>
    )
  }

  renderHeader = () => {
    const isAuthRequired = !this.props.keystore.accounts.length

    if (isAuthRequired) {
      return this.renderAuthHeader()
    }

    return this.renderJWalletHeader()
  }

  renderContent = () => {
    return <div className='content'>{this.props.children}</div>
  }

  /* eslint-disable class-methods-use-this */
  renderFooter = () => {
    return <JFooter />
  }

  renderAuthHeader = () => {
    return <AuthHeader />
  }

  renderJWalletHeader = () => {
    const {
      setActiveNetwork,
      saveCustomNetwork,
      removeCustomNetwork,
      openCurrenciesModal,
      openImportKeystoreAccountModal,
      openNewKeystoreAccountModal,
      openKeystoreModal,
      keystore,
      networks,
    } = this.props

    return (
      <JWalletHeader
        setActiveNetwork={setActiveNetwork}
        saveCustomNetwork={saveCustomNetwork}
        removeCustomNetwork={removeCustomNetwork}
        openConvertFundsModal={this.fundsModal('Convert')}
        openCurrenciesModal={openCurrenciesModal}
        openImportKeystoreAccountModal={openImportKeystoreAccountModal}
        openKeystoreModal={openKeystoreModal}
        openNewKeystoreAccountModal={openNewKeystoreAccountModal}
        openReceiveFundsModal={this.fundsModal('Receive')}
        openSendFundsModal={this.fundsModal('Send')}
        accountName={keystore.currentAccount.accountName}
        networks={networks}
      />
    )
  }

  renderModals = () => {
    return (
      <div>
        <BackupKeystoreModal />
        <ClearKeystoreModal />
        <ConvertFundsModal />
        <CurrenciesModal />
        <CustomTokenModal />
        <KeystoreModal />
        <ImportKeyStoreAccountModal />
        <NewKeystoreAccountModal />
        <NewKeystorePasswordModal />
        <ReceiveFundsModal />
        <SendFundsModal />
      </div>
    )
  }

  isAnyModalOpened() {
    const {
      isBackupKeystoreModalOpen,
      isClearKeystoreModalOpen,
      isConvertFundsModalOpen,
      isCurrenciesModalOpen,
      isCustomTokenModalOpen,
      isImportKeystoreAccountModalOpen,
      isNewKeystoreAccountModalOpen,
      isNewKeystorePasswordModalOpen,
      isReceiveFundsModalOpen,
      isSendFundsModalOpen,
      keystore: { isKeystoreModalOpen },
    } = this.props

    return (
      isBackupKeystoreModalOpen ||
      isClearKeystoreModalOpen ||
      isConvertFundsModalOpen ||
      isCurrenciesModalOpen ||
      isCustomTokenModalOpen ||
      isImportKeystoreAccountModalOpen ||
      isKeystoreModalOpen ||
      isNewKeystoreAccountModalOpen ||
      isNewKeystorePasswordModalOpen ||
      isReceiveFundsModalOpen ||
      isSendFundsModalOpen
    )
  }

  fundsModal = modalName => () => this.props[`open${modalName}FundsModal`]()
}

CoreLayout.propTypes = {
  getKeystoreFromStorage: PropTypes.func.isRequired,
  getNetworksFromStorage: PropTypes.func.isRequired,
  setActiveNetwork: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  removeCustomNetwork: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  openCurrenciesModal: PropTypes.func.isRequired,
  openImportKeystoreAccountModal: PropTypes.func.isRequired,
  openKeystoreModal: PropTypes.func.isRequired,
  openNewKeystoreAccountModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openSendFundsModal: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    accounts: PropTypes.arrayOf(PropTypes.shape({
      encrypted: PropTypes.shape({
        privateKey: PropTypes.object,
        mnemonic: PropTypes.object,
        hdPath: PropTypes.object,
      }).isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      accountName: PropTypes.string.isRequired,
      address: PropTypes.string,
      derivationPath: PropTypes.string,
      bip32XPublicKey: PropTypes.string,
      isReadOnly: PropTypes.bool,
    })).isRequired,
    currentAccount: PropTypes.shape({
      accountName: PropTypes.string.isRequired,
    }).isRequired,
    isKeystoreModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
  networks: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      rpcAddr: PropTypes.string.isRequired,
      isCustom: PropTypes.bool.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isNewKeystoreAccountModalOpen: PropTypes.bool.isRequired,
  isClearKeystoreModalOpen: PropTypes.bool.isRequired,
  isBackupKeystoreModalOpen: PropTypes.bool.isRequired,
  isConvertFundsModalOpen: PropTypes.bool.isRequired,
  isCurrenciesModalOpen: PropTypes.bool.isRequired,
  isCustomTokenModalOpen: PropTypes.bool.isRequired,
  isImportKeystoreAccountModalOpen: PropTypes.bool.isRequired,
  isNewKeystorePasswordModalOpen: PropTypes.bool.isRequired,
  isReceiveFundsModalOpen: PropTypes.bool.isRequired,
  isSendFundsModalOpen: PropTypes.bool.isRequired,
  children: PropTypes.element,
}

CoreLayout.defaultProps = {
  children: null,
}

export default CoreLayout
