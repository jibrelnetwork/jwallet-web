import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JPopover } from 'components/base'

import NetworksCustomRpc from './NetworksCustomRpc'

function NetworksManagerPopover(props) {
  const {
    onClickOutside,
    setActiveNetwork,
    saveCustomNetwork,
    removeCustomNetwork,
    shakePopover,
    networks,
    isShake,
  } = props

  const { items, currentActiveIndex } = networks

  const body = (
    <div className='networks-manager__popover'>
      <div className='networks-manager__items'>
        {items.map(({ title, isCustom }, i) => {
          const isActive = (currentActiveIndex === i)

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
              onClick={setActiveNetwork(i)}
              className={`network ${isActive ? 'network--active' : ''}`}
              key={i}
            >
              <span className='network__title'>{title}</span>{icon}
            </div>
          )
        })}
      </div>
      <NetworksCustomRpc saveCustomNetwork={saveCustomNetwork} shakePopover={shakePopover} />
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
  setActiveNetwork: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  removeCustomNetwork: PropTypes.func.isRequired,
  shakePopover: PropTypes.func.isRequired,
  networks: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      rpcAddr: PropTypes.string.isRequired,
      isCustom: PropTypes.bool.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  isShake: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func,
}

NetworksManagerPopover.defaultProps = {
  onClickOutside: () => {},
}

export default NetworksManagerPopover
