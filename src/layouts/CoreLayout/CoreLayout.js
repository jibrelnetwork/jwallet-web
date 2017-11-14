import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { base, modals, JWalletHeader } from 'components'

import 'styles/core.scss'

const { JFooter, JLoader } = base

const {
  BackupKeystoreModal,
  ClearKeystoreModal,
  CurrenciesModal,
  CustomTokenModal,
  ImportKeystoreAccountModal,
  KeystoreModal,
  NewDerivationPathModal,
  NewKeystoreAccountModal,
  NewKeystorePasswordModal,
  ReceiveFundsModal,
  SendFundsModal,
} = modals

class CoreLayout extends Component {
  componentDidMount() {
    const { getKeystoreFromStorage, getNetworksFromStorage, keystore, networks } = this.props

    if (!(keystore.accounts && keystore.accounts.length)) {
      getKeystoreFromStorage()
    }

    if (!(networks.items && networks.items.length)) {
      getNetworksFromStorage()
    }
  }

  render() {
    const { keystore, children } = this.props

    if (keystore.isLoading || !children) {
      return <JLoader fixed />
    }

    return (
      <div className='container-wrap'>
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
    const {
      setCurrentNetwork,
      setCustomNetworkValue,
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
        setCurrentNetwork={setCurrentNetwork}
        setCustomNetworkValue={setCustomNetworkValue}
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

  renderContent = () => {
    return <div className='content'>{this.props.children}</div>
  }

  /* eslint-disable class-methods-use-this */
  renderFooter = () => {
    return <JFooter />
  }

  renderModals = () => {
    return (
      <div>
        <BackupKeystoreModal />
        <ClearKeystoreModal />
        <CurrenciesModal />
        <CustomTokenModal />
        <KeystoreModal />
        <ImportKeystoreAccountModal />
        <NewDerivationPathModal />
        <NewKeystoreAccountModal />
        <NewKeystorePasswordModal />
        <ReceiveFundsModal />
        <SendFundsModal />
      </div>
    )
  }

  isAnyModalOpened() {
    const {
      keystore,
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
    } = this.props

    return (
      keystore.isOpen ||
      isBackupKeystoreModalOpen ||
      isClearKeystoreModalOpen ||
      isConvertFundsModalOpen ||
      isCurrenciesModalOpen ||
      isCustomTokenModalOpen ||
      isImportKeystoreAccountModalOpen ||
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
  setCurrentNetwork: PropTypes.func.isRequired,
  setCustomNetworkValue: PropTypes.func.isRequired,
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
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  networks: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      isCustom: PropTypes.bool.isRequired,
    })).isRequired,
    customNetworkRpc: PropTypes.string.isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  isNewKeystoreAccountModalOpen: PropTypes.bool.isRequired,
  isClearKeystoreModalOpen: PropTypes.bool.isRequired,
  isBackupKeystoreModalOpen: PropTypes.bool.isRequired,
  isConvertFundsModalOpen: PropTypes.bool.isRequired,
  isCurrenciesModalOpen: PropTypes.bool.isRequired,
  isCustomTokenModalOpen: PropTypes.bool.isRequired,
  isImportKeystoreAccountModalOpen: PropTypes.bool.isRequired,
  isNewDerivationPathModalOpen: PropTypes.bool.isRequired,
  isNewKeystorePasswordModalOpen: PropTypes.bool.isRequired,
  isReceiveFundsModalOpen: PropTypes.bool.isRequired,
  isSendFundsModalOpen: PropTypes.bool.isRequired,
  children: PropTypes.element,
}

CoreLayout.defaultProps = {
  children: null,
}

export default CoreLayout
