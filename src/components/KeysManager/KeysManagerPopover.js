import React from 'react'
import PropTypes from 'prop-types'

import JbPopover from 'components/base/JbPopover'
import JbIcon from 'components/base/JbIcon'

function KeysManagerPopover(props) {
  const {
    onClickOutside,
    addNewKeys,
    importKeys,
    backupKeys,
    clearKeys,
    keys,
    active,
  } = props

  const body = (
    <div className='keys-manager-popover-wrap'>
      <div className='keys-manager__addresses scroll'>
        {keys.map((key, i) => {
          const { privateKey, balance, code } = key
          const activeClass = (active === i) ? 'keys-manager__address--active' : ''

          return (
            <div className={`keys-manager__address ${activeClass}`} key={i}>
              <span className='keys-manager__key-hash'>{privateKey}</span>
              <span className='keys-manager__key-balance'>{balance}</span>
              <span className='keys-manager__key-code'>{code}</span>
            </div>
          )
        })}
      </div>
      <div className='keys-manager__actions'>
        <div className='keys-manager__action' onClick={addNewKeys}>
          <JbIcon name='add' small />{'New keys'}
        </div>
        <div className='keys-manager__action' onClick={importKeys}>
          <JbIcon name='import' small />Import keys
        </div>
        <div className='keys-manager__action' onClick={backupKeys}>
          <JbIcon name='backup' small />Backup keys
        </div>
        <div className='keys-manager__action' onClick={clearKeys}>
          <JbIcon name='clear' small />Clear keys
        </div>
      </div>
    </div>
  )

  return (
    <JbPopover
      name='keys-manager'
      onClickOutside={onClickOutside}
      body={body}
    />
  )
}

KeysManagerPopover.propTypes = {
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
}

export default KeysManagerPopover
