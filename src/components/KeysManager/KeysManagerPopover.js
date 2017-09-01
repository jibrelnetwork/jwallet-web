import React from 'react'
import PropTypes from 'prop-types'

import JbPopover from 'components/base/JbPopover'
import JbIcon from 'components/base/JbIcon'

function KeysManagerPopover(props) {
  const {
    onClickOutside,
    setActiveKey,
    addNewKeys,
    importKeys,
    backupKeys,
    clearKeys,
    keys,
    active,
  } = props

  const body = (
    <div className='keys-manager-popover-wrap'>
      <div className='keys-manager__keys'>
        {keys.map((key, i) => {
          const { privateKey, balance, code } = key

          return (
            <div
              key={i}
              className={`key popover__item ${(active === i) ? 'key--active' : ''}`}
              onClick={setActiveKey(i)}
            >
              <span className='key__hash'>{privateKey}</span>
              <span className='key__balance'>{balance}</span>
              <span className='key__code'>{code}</span>
            </div>
          )
        })}
      </div>
      <div className='keys-manager__actions'>
        <div className='action popover__item' onClick={addNewKeys}>
          <JbIcon name='small-add' small />
          <span className='action__title'>{'New keys'}</span>
        </div>
        <div className='action popover__item' onClick={importKeys}>
          <JbIcon name='small-import' small />
          <span className='action__title'>{'Import keys'}</span>
        </div>
        <div className='action popover__item' onClick={backupKeys}>
          <JbIcon name='small-backup' small />
          <span className='action__title'>{'Backup keys'}</span>
        </div>
        <div className='action popover__item action--clear' onClick={clearKeys}>
          <JbIcon name='small-clear' small />
          <span className='action__title'>{'Clear keys'}</span>
        </div>
      </div>
    </div>
  )

  return <JbPopover name='keys-manager' onClickOutside={onClickOutside} body={body} />
}

KeysManagerPopover.propTypes = {
  setActiveKey: PropTypes.func.isRequired,
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
}

export default KeysManagerPopover
