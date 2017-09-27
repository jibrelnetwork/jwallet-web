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
  BackupKeysModal,
  ImportKeysModal,
  NewKeysModal,
  AddCustomTokenModal,
} from 'components'

import 'styles/core.scss'

const { JFooter, JLoader } = base

class CoreLayout extends Component {
  componentWillMount() {
    const { getKeysFromCache, getNetworksFromCache, keys, networks } = this.props

    if (!(keys.items && keys.items.length)) {
      getKeysFromCache()
    }

    if (!(networks.items && networks.items.length)) {
      getNetworksFromCache()
    }
  }

  render() {
    const { keys, location, children } = this.props

    const isAuth = (location.pathname.indexOf('/auth') === 0)

    if (keys.isLoading || !children) {
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
    const keys = this.props.keys.items
    const isAuthRequired = !(keys && keys.length)

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
      getKeysFromCache,
      setActiveKey,
      openNewKeysModal,
      openImportKeysModal,
      openBackupKeysModal,
      clearKeys,
      setActiveNetwork,
      saveCustomNetwork,
      removeCustomNetwork,
      keys,
      networks,
    } = this.props

    return (
      <JWalletHeader
        openAccountManager={openAccountManager}
        openSendFundsModal={openSendFundsModal}
        openReceiveFundsModal={openReceiveFundsModal}
        openConvertFundsModal={openConvertFundsModal}
        getKeysFromCache={getKeysFromCache}
        setActiveKey={setActiveKey}
        openNewKeysModal={openNewKeysModal}
        openImportKeysModal={openImportKeysModal}
        openBackupKeysModal={openBackupKeysModal}
        clearKeys={clearKeys}
        setActiveNetwork={setActiveNetwork}
        saveCustomNetwork={saveCustomNetwork}
        removeCustomNetwork={removeCustomNetwork}
        keys={keys}
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
        <BackupKeysModal />
        <ImportKeysModal />
        <NewKeysModal />
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
      keys: {
        isNewKeysModalOpen,
        isImportKeysModalOpen,
        isBackupKeysModalOpen,
      },
    } = this.props

    return (
      isAccountManagerOpen ||
      isAddCustomTokenModalOpen ||
      isSendFundsModalOpen ||
      isReceiveFundsModalOpen ||
      isConvertFundsModalOpen ||
      isNewKeysModalOpen ||
      isImportKeysModalOpen ||
      isBackupKeysModalOpen
    )
  }
}

CoreLayout.propTypes = {
  openAccountManager: PropTypes.func.isRequired,
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  getKeysFromCache: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  openNewKeysModal: PropTypes.func.isRequired,
  openImportKeysModal: PropTypes.func.isRequired,
  openBackupKeysModal: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
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
  keys: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      privateKey: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isNewKeysModalOpen: PropTypes.bool.isRequired,
    isImportKeysModalOpen: PropTypes.bool.isRequired,
    isBackupKeysModalOpen: PropTypes.bool.isRequired,
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
