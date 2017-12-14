import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'config'
import JDropdown from 'components/base/JDropdown'

import NetworksManagerLoading from './NetworksManagerLoading'
import NetworksManagerPopover from './NetworksManagerPopover'
import NetworksManagerTitle from './NetworksManagerTitle'

class NetworksManager extends Component {
  constructor(props) {
    super(props)
    this.state = { isShake: false }
  }

  render() {
    const { setCurrentNetwork, removeCustomNetwork, networks } = this.props

    if (networks.isLoading) {
      return <NetworksManagerLoading />
    }

    const title = <NetworksManagerTitle />

    return (
      <JDropdown
        className='networks-manager'
        parentClassName='header__networks-manager pull-right'
        title={title}
      >
        <NetworksManagerPopover
          setCurrentNetwork={this.popoverHandlerWithClick(setCurrentNetwork)}
          setCustomNetworkValue={this.setCustomNetworkValue}
          saveCustomNetwork={this.saveCustomNetwork}
          removeCustomNetwork={this.popoverHandlerWithClick(removeCustomNetwork)}
          shakePopover={this.shakePopover}
          networks={networks}
          isShake={this.state.isShake}
        />
      </JDropdown>
    )
  }

  setCustomNetworkValue = e => this.props.setCustomNetworkValue(e.target.value)

  saveCustomNetwork = customNetworkRpc => () => {
    const { saveCustomNetwork, setCustomNetworkValue } = this.props

    if (!customNetworkRpc.length || this.state.isShake) {
      return
    }

    saveCustomNetwork(customNetworkRpc, setCustomNetworkValue, this.shakePopover)
  }

  popoverHandlerWithClick = handler => index => (e) => {
    e.preventDefault()

    handler(index)

    // to close popover we need to generate click event outside it
    document.body.click()

    e.stopPropagation()
  }

  shakePopover = () => {
    this.setState({ isShake: true })

    setTimeout(() => this.setState({ isShake: false }), config.popoverShakeTimeout)
  }
}

NetworksManager.propTypes = {
  setCurrentNetwork: PropTypes.func.isRequired,
  setCustomNetworkValue: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  removeCustomNetwork: PropTypes.func.isRequired,
  networks: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      isCustom: PropTypes.bool.isRequired,
    })).isRequired,
    customNetworkRpc: PropTypes.string.isRequired,
    currentNetworkIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
}

export default NetworksManager
