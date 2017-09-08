import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbDropdown from 'components/base/JbDropdown'

import KeysManagerPopover from './KeysManagerPopover'
import KeysManagerTitle from './KeysManagerTitle'

class KeysManager extends Component {
  render() {
    const {
      addNewKeys,
      importKeys,
      backupKeys,
      clearKeys,
      keys,
    } = this.props

    const { items, currentActiveIndex } = keys
    const { privateKey, balance, code } = items[currentActiveIndex]
    const title = <KeysManagerTitle privateKey={privateKey} balance={balance} code={code} />

    return (
      <JbDropdown
        className='keys-manager'
        parentClassName='header__keys-manager pull-right'
        title={title}
      >
        <KeysManagerPopover
          setActiveKey={this.setActiveKey}
          addNewKeys={addNewKeys}
          importKeys={importKeys}
          backupKeys={backupKeys}
          clearKeys={clearKeys}
          keys={keys}
        />
      </JbDropdown>
    )
  }

  setActiveKey = index => (/* event */) => this.props.setActiveKey(index)
}

KeysManager.propTypes = {
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

export default KeysManager
