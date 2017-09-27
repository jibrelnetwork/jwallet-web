import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'config'

import JDropdown from 'components/base/JDropdown'

import NetworksManagerPopover from './NetworksManagerPopover'
import NetworksManagerTitle from './NetworksManagerTitle'

class NetworksManager extends Component {
  constructor(props) {
    super(props)
    this.state = { isShake: false }
  }

  render() {
    const { saveCustomNetwork, networks } = this.props
    const { items, currentActiveIndex, isLoading } = networks

    if (isLoading) {
      return null
    }

    const currentNetwork = items[currentActiveIndex]
    const title = <NetworksManagerTitle title={currentNetwork.title} />

    return (
      <JDropdown
        className='networks-manager'
        parentClassName='header__networks-manager pull-right'
        title={title}
      >
        <NetworksManagerPopover
          setActiveNetwork={this.setActiveNetwork}
          saveCustomNetwork={saveCustomNetwork}
          removeCustomNetwork={this.removeCustomNetwork}
          shakePopover={this.shakePopover}
          networks={networks}
          isShake={this.state.isShake}
        />
      </JDropdown>
    )
  }

  setActiveNetwork = i => this.popoverHandlerWithClick(this.props.setActiveNetwork)(i)
  removeCustomNetwork = i => this.popoverHandlerWithClick(this.props.removeCustomNetwork)(i)

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
  setActiveNetwork: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  removeCustomNetwork: PropTypes.func.isRequired,
  networks: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      rpcAddr: PropTypes.string.isRequired,
      isCustom: PropTypes.bool.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
}

export default NetworksManager
