import React from 'react'
import PropTypes from 'prop-types'

import JHeader from 'components/base/JHeader'

import KeysManager from 'components/KeysManager'

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
    keys,
  } = props

  return (
    <JHeader>
      <div className='clear'>
        <HeaderMenu
          openSendFundsModal={openSendFundsModal}
          openReceiveFundsModal={openReceiveFundsModal}
          openConvertFundsModal={openConvertFundsModal}
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
  keys: PropTypes.shape({
    items: PropTypes.array.isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
  }).isRequired,
}

export default JWalletHeader
