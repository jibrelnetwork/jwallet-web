import React from 'react'
import PropTypes from 'prop-types'

import JbDropdown from 'components/base/JbDropdown'
import JbIcon from 'components/base/JbIcon'

import KeysManagerPopover from './KeysManagerPopover'

function KeysManager(props) {
  const {
    setActiveKey,
    addNewKeys,
    importKeys,
    backupKeys,
    clearKeys,
    keys,
    active,
  } = props

  const { privateKey, balance, code } = keys[active]

  const title = (
    <div className='keys-manager__title'>
      <div className='keys-manager__head'>{'Keys manager'}</div>
      <div className='key key--title'>
        <span className='key__hash'>{privateKey}</span>
        <span className='key__balance'>{balance}</span>
        <span className='key__code'>{code}</span>
      </div>
      <JbIcon name='keys' className='keys-manager__icon' />
    </div>
  )

  return (
    <JbDropdown
      className='keys-manager'
      parentClassName='header__keys-manager'
      title={title}
    >
      <KeysManagerPopover
        setActiveKey={setActiveKey}
        addNewKeys={addNewKeys}
        importKeys={importKeys}
        backupKeys={backupKeys}
        clearKeys={clearKeys}
        keys={keys}
        active={active}
      />
    </JbDropdown>
  )
}

KeysManager.propTypes = {
  setActiveKey: PropTypes.func.isRequired,
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
}

export default KeysManager
