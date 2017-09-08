import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { JbFooter, JbLoader } from 'components/base'

import AuthHeader from 'components/AuthHeader'
import JWalletHeader from 'components/JWalletHeader'

import 'styles/core.scss'

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
      addNewKeys,
      importKeys,
      backupKeys,
      clearKeys,
      sendFunds,
      receiveFunds,
      convertFunds,
      keys,
    } = this.props

    return (
      <JWalletHeader
        getKeysFromCache={getKeysFromCache}
        setActiveKey={setActiveKey}
        addNewKeys={addNewKeys}
        importKeys={importKeys}
        backupKeys={backupKeys}
        clearKeys={clearKeys}
        sendFunds={sendFunds}
        receiveFunds={receiveFunds}
        convertFunds={convertFunds}
        keys={keys}
      />
    )
  }
}

CoreLayout.propTypes = {
  getKeysFromCache: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
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
