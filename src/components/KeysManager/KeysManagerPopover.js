import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JPopover } from 'components/base'

function KeysManagerPopover(props) {
  const {
    onClickOutside,
    setActiveKey,
    addNewKeys,
    importKeys,
    backupKeys,
    clearKeys,
    keys,
  } = props

  const { items, currentActiveIndex } = keys

  const body = (
    <div className='keys-manager__popover'>
      <div className='keys-manager__keys'>
        {items.map((key, i) => {
          const { privateKey, balance, code } = key

          return (
            <div
              key={i}
              className={`key popover__item ${(currentActiveIndex === i) ? 'key--active' : ''}`}
              onClick={setActiveKey(i)}
            >
              <span className='key__hash'>{privateKey}</span>
              <span className='key__balance'>{balance.toFixed(3)}</span>
              <span className='key__code'>{code}</span>
            </div>
          )
        })}
      </div>
      <div className='popover__items'>
        <div className='popover__item' onClick={addNewKeys}>
          <JIcon name='small-add' small />
          <span className='title'>{'New keys'}</span>
        </div>
        <div className='popover__item' onClick={importKeys}>
          <JIcon name='small-import' small />
          <span className='title'>{'Import keys'}</span>
        </div>
        <div className='popover__item' onClick={backupKeys}>
          <JIcon name='small-backup' small />
          <span className='title'>{'Backup keys'}</span>
        </div>
        <div className='popover__item popover__item--gray' onClick={clearKeys}>
          <JIcon name='small-clear' small />
          <span className='title'>{'Clear keys'}</span>
        </div>
      </div>
    </div>
  )

  return <JPopover name='keys-manager' onClickOutside={onClickOutside} body={body} />
}

KeysManagerPopover.propTypes = {
  setActiveKey: PropTypes.func.isRequired,
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    items: PropTypes.array.isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
  }).isRequired,
  onClickOutside: PropTypes.func,
}

KeysManagerPopover.defaultProps = {
  onClickOutside: () => {},
}

export default KeysManagerPopover
