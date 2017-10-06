import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  base,
  AuthHeader,
  JWalletHeader,
  AccountManager,
  ConvertFundsModal,
  ReceiveFundsModal,
  SendFundsModal,
  KeystoreModal,
  NewKeyModal,
  ImportKeyModal,
  BackupKeystoreModal,
  AddCustomTokenModal,
} from 'components'

import 'styles/core.scss'

const { JFooter, JLoader } = base

class CoreLayout extends Component {
  componentWillMount() {
    const { getKeystoreFromStorage, getNetworksFromCache, keystore, networks } = this.props

    if (!(keystore.accounts && keystore.accounts.length)) {
      getKeystoreFromStorage()
    }

    if (!(networks.items && networks.items.length)) {
      getNetworksFromCache()
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
    const { accounts } = this.props.keystore
    const isAuthRequired = !(accounts && accounts.length)

    return this.renderAuthHeader()
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
      openAccountManager,
      openSendFundsModal,
      openReceiveFundsModal,
      openConvertFundsModal,
      openKeystoreModal,
      openNewKeyModal,
      openImportKeyModal,
      setActiveNetwork,
      saveCustomNetwork,
      removeCustomNetwork,
      networks,
    } = this.props

    return (
      <JWalletHeader
        openAccountManager={openAccountManager}
        openSendFundsModal={openSendFundsModal}
        openReceiveFundsModal={openReceiveFundsModal}
        openConvertFundsModal={openConvertFundsModal}
        openKeystoreModal={openKeystoreModal}
        openNewKeyModal={openNewKeyModal}
        openImportKeyModal={openImportKeyModal}
        setActiveNetwork={setActiveNetwork}
        saveCustomNetwork={saveCustomNetwork}
        removeCustomNetwork={removeCustomNetwork}
        networks={networks}
      />
    )
  }

  renderModals = () => {
    return (
      <div>
        <AccountManager />
        <SendFundsModal />
        <ReceiveFundsModal />
        <ConvertFundsModal />
        <NewKeyModal />
        <ImportKeyModal />
        <BackupKeystoreModal />
        <AddCustomTokenModal />
      </div>
    )
  }

  isAnyModalOpened() {
    const {
      accounts: {
        isAccountManagerOpen,
        isAddCustomTokenModalOpen,
      },
      funds: {
        isSendFundsModalOpen,
        isReceiveFundsModalOpen,
        isConvertFundsModalOpen,
      },
      keystore: {
        isKeystoreModalOpen,
        isNewKeyModalOpen,
        isImportKeyModalOpen,
        isBackupKeystoreModalOpen,
      },
    } = this.props

    return (
      isAccountManagerOpen ||
      isAddCustomTokenModalOpen ||
      isSendFundsModalOpen ||
      isReceiveFundsModalOpen ||
      isConvertFundsModalOpen ||
      isKeystoreModalOpen ||
      isNewKeyModalOpen ||
      isImportKeyModalOpen ||
      isBackupKeystoreModalOpen
    )
  }
}

CoreLayout.propTypes = {
  openAccountManager: PropTypes.func.isRequired,
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  getKeystoreFromStorage: PropTypes.func.isRequired,
  openKeystoreModal: PropTypes.func.isRequired,
  openNewKeyModal: PropTypes.func.isRequired,
  openImportKeyModal: PropTypes.func.isRequired,
  getNetworksFromCache: PropTypes.func.isRequired,
  setActiveNetwork: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  removeCustomNetwork: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    isAccountManagerOpen: PropTypes.bool.isRequired,
    isAddCustomTokenModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
  funds: PropTypes.shape({
    isSendFundsModalOpen: PropTypes.bool.isRequired,
    isReceiveFundsModalOpen: PropTypes.bool.isRequired,
    isConvertFundsModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
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
    isKeystoreModalOpen: PropTypes.bool.isRequired,
    isNewKeyModalOpen: PropTypes.bool.isRequired,
    isImportKeyModalOpen: PropTypes.bool.isRequired,
    isBackupKeystoreModalOpen: PropTypes.bool.isRequired,
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
  children: PropTypes.element,
}

CoreLayout.defaultProps = {
  children: null,
}

export default CoreLayout
