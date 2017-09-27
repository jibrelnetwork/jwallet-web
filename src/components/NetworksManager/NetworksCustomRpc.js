import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'config'

import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import JIcon from 'components/base/JIcon'

class NetworksCustomRpc extends Component {
  constructor(props) {
    super(props)
    this.state = { customNetworkRpc: '' }
  }

  render() {
    const { placeholder } = this.props
    const { customNetworkRpc } = this.state
    const isValueExist = !!customNetworkRpc.length

    return (
      <div
        onKeyPress={handleEnterKeyPress(this.saveCustomNetwork)}
        className={`networks-custom-rpc ${isValueExist ? 'networks-custom-rpc--value' : ''}`}
      >
        <input
          className='networks-custom-rpc__input'
          type='text'
          placeholder={placeholder}
          title={placeholder}
          onChange={this.setCustomNetworkRpc}
          value={customNetworkRpc}
          autoFocus
        />
        <JIcon
          onClick={this.saveCustomNetwork}
          name='networks-checkbox'
          className='networks-custom-rpc__icon'
          small
        />
      </div>
    )
  }

  setCustomNetworkRpc = e => this.setState({ customNetworkRpc: e.target.value })

  saveCustomNetwork = (/* event */) => {
    const { saveCustomNetwork, shakePopover } = this.props
    const { customNetworkRpc } = this.state

    if (!customNetworkRpc.length) {
      return null
    }

    const isValid = this.checkCustomNetworkRpc(customNetworkRpc)

    if (!isValid) {
      return shakePopover()
    }

    saveCustomNetwork(customNetworkRpc)

    return this.setState({ customNetworkRpc: '' })
  }

  checkCustomNetworkRpc = customNetworkRpc => config.urlRe.test(customNetworkRpc)
}

NetworksCustomRpc.propTypes = {
  saveCustomNetwork: PropTypes.func.isRequired,
  shakePopover: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

NetworksCustomRpc.defaultProps = {
  placeholder: 'Custom RPC',
}

export default NetworksCustomRpc
