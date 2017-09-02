import React from 'react'
import PropTypes from 'prop-types'

import JbLogo from 'components/base/JbLogo'

import KeysManager from 'components/KeysManager'

import HeaderMenu from './HeaderMenu'

function Header(props) {
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
    active,
  } = props

  return (
    <div className='header clear'>
      <JbLogo className='header__logo pull-left' />
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
        active={active}
      />
    </div>
  )
}

Header.propTypes = {
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
}

export default Header
