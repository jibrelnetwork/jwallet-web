import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  base,
  AuthHeader,
  JWalletHeader,
  ConvertFundsModal,
  ReceiveFundsModal,
  SendFundsModal,
  BackupKeysModal,
  ImportKeysModal,
  NewKeysModal,
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
      <div className='container'>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
        {this.renderModals()}
      </div>
    )
  }

  renderHeader() {
    const keys = this.props.keys.items
    const isAuthRequired = !(keys && keys.length)

    if (isAuthRequired) {
      return this.renderAuthHeader()
    }

    return this.renderJWalletHeader()
  }

  renderContent() {
    return <div className='content'>{this.props.children}</div>
  }

  /* eslint-disable class-methods-use-this */
  renderFooter() {
    return <JbFooter />
  }

  renderAuthHeader() {
    return <AuthHeader />
  }

  renderJWalletHeader() {
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

  renderModals() {
    return (
      <div>
        <SendFundsModal />
        <ReceiveFundsModal />
        <ConvertFundsModal />
        <BackupKeysModal />
        <ImportKeysModal />
        <NewKeysModal />
      </div>
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
  keys: PropTypes.shape({
    items: PropTypes.array.isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.element,
}

CoreLayout.defaultProps = {
  children: null,
}

export default CoreLayout
