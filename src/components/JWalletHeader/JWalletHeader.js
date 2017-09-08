import React from 'react'
import PropTypes from 'prop-types'

import JbHeader from 'components/base/JbHeader'

import KeysManager from 'components/KeysManager'

import HeaderMenu from './HeaderMenu'

function JWalletHeader(props) {
  const {
    sendFunds,
    receiveFunds,
    convertFunds,
    setActiveKey,
    addNewKeys,
    importKeys,
    backupKeys,
    clearKeys,
    keys,
  } = props

  return (
    <JbHeader>
      <div className='clear'>
        <HeaderMenu
          sendFunds={sendFunds}
          receiveFunds={receiveFunds}
          convertFunds={convertFunds}
        />
        <KeysManager
          setActiveKey={setActiveKey}
          addNewKeys={addNewKeys}
          importKeys={importKeys}
          backupKeys={backupKeys}
          clearKeys={clearKeys}
          keys={keys}
        />
      </div>
    </JbHeader>
  )
}

JWalletHeader.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    items: PropTypes.array.isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
  }).isRequired,
}

export default JWalletHeader
