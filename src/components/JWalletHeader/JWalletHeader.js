import React from 'react'
import PropTypes from 'prop-types'

import JHeader from 'components/base/JHeader'

import { KeysManager, NetworksManager } from 'components'

import HeaderMenu from './HeaderMenu'

function JWalletHeader(props) {
  const {
    openSendFundsModal,
    openReceiveFundsModal,
    openConvertFundsModal,
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
  } = props

  return (
    <JHeader>
      <div className='clear'>
        <HeaderMenu
          openSendFundsModal={openSendFundsModal}
          openReceiveFundsModal={openReceiveFundsModal}
          openConvertFundsModal={openConvertFundsModal}
        />
        <NetworksManager
          setActiveNetwork={setActiveNetwork}
          saveCustomNetwork={saveCustomNetwork}
          removeCustomNetwork={removeCustomNetwork}
          networks={networks}
        />
        <KeysManager
          setActiveKey={setActiveKey}
          addNewKeys={openNewKeysModal}
          importKeys={openImportKeysModal}
          backupKeys={openBackupKeysModal}
          clearKeys={clearKeys}
          keys={keys}
        />
      </div>
    </JHeader>
  )
}

JWalletHeader.propTypes = {
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  openNewKeysModal: PropTypes.func.isRequired,
  openImportKeysModal: PropTypes.func.isRequired,
  openBackupKeysModal: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  setActiveNetwork: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  removeCustomNetwork: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      privateKey: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
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
}

export default JWalletHeader
