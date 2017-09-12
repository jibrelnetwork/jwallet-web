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

const { JbFooter, JbLoader } = base

class CoreLayout extends Component {
  componentWillMount() {
    const { getKeysFromCache, keys } = this.props

    if (!(keys.items && keys.items.length)) {
      getKeysFromCache()
    }
  }

  render() {
    const { keys, children } = this.props

    if (keys.isLoading || !children) {
      return <JbLoader fixed />
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
    return <JbFooter />
  }

  renderAuthHeader = () => {
    return <AuthHeader />
  }

  renderJWalletHeader = () => {
    const {
      getKeysFromCache,
      setActiveKey,
      openNewKeysModal,
      openImportKeysModal,
      openBackupKeysModal,
      clearKeys,
      openSendFundsModal,
      openReceiveFundsModal,
      openConvertFundsModal,
      keys,
    } = this.props

    return (
      <JWalletHeader
        openSendFundsModal={openSendFundsModal}
        openReceiveFundsModal={openReceiveFundsModal}
        openConvertFundsModal={openConvertFundsModal}
        getKeysFromCache={getKeysFromCache}
        setActiveKey={setActiveKey}
        openNewKeysModal={openNewKeysModal}
        openImportKeysModal={openImportKeysModal}
        openBackupKeysModal={openBackupKeysModal}
        clearKeys={clearKeys}
        keys={keys}
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
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  getKeysFromCache: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  openNewKeysModal: PropTypes.func.isRequired,
  openImportKeysModal: PropTypes.func.isRequired,
  openBackupKeysModal: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
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
    items: PropTypes.array.isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isNewKeysModalOpen: PropTypes.bool.isRequired,
    isImportKeysModalOpen: PropTypes.bool.isRequired,
    isBackupKeysModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.element,
}

CoreLayout.defaultProps = {
  children: null,
}

export default CoreLayout
