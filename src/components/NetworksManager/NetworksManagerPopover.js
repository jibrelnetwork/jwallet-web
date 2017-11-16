import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JPopover } from 'components/base'

import NetworksCustomRpc from './NetworksCustomRpc'

function NetworksManagerPopover(props) {
  const {
    onClickOutside,
    setCurrentNetwork,
    setCustomNetworkValue,
    saveCustomNetwork,
    removeCustomNetwork,
    networks,
    isShake,
  } = props

  const { items, customNetworkRpc, currentNetworkIndex } = networks

  const body = (
    <div className='networks-manager__popover'>
      <div className='networks-manager__items'>
        {items.map(({ title, isCustom }, i) => {
          const isActive = (currentNetworkIndex === i)

          const icon = isCustom
            ? (
              <JIcon
                name='small-clear'
                small
                className='network__icon'
                onClick={removeCustomNetwork(i)}
              />
            ) : null

          return (
            <div
              onClick={setCurrentNetwork(i)}
              className={`network ${isActive ? 'network--active' : ''}`}
              key={i}
            >
              <span className='network__title'>{title}</span>{icon}
            </div>
          )
        })}
      </div>
      <NetworksCustomRpc
        setCustomNetworkValue={setCustomNetworkValue}
        saveCustomNetwork={saveCustomNetwork}
        customNetworkRpc={customNetworkRpc}
      />
    </div>
  )

  return (
    <JPopover
      onClickOutside={onClickOutside}
      body={body}
      name='networks-manager'
      isShake={isShake}
    />
  )
}

NetworksManagerPopover.propTypes = {
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
  }).isRequired,
  isShake: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func,
}

NetworksManagerPopover.defaultProps = {
  onClickOutside: () => {},
}

export default NetworksManagerPopover
