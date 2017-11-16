import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'
import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import JIcon from 'components/base/JIcon'

function NetworksCustomRpc(props) {
  const { setCustomNetworkValue, saveCustomNetwork, customNetworkRpc, placeholder } = props
  const isValueExist = !!customNetworkRpc.length
  const save = saveCustomNetwork(customNetworkRpc)

  return (
    <div
      onKeyPress={handleEnterKeyPress(save)}
      className={`networks-custom-rpc ${isValueExist ? 'networks-custom-rpc--value' : ''}`}
    >
      <input
        className='networks-custom-rpc__input'
        type='text'
        placeholder={placeholder}
        title={placeholder}
        onChange={setCustomNetworkValue}
        value={customNetworkRpc}
        autoFocus
      />
      <JIcon
        onClick={save}
        name='networks-checkbox'
        className='networks-custom-rpc__icon'
        small
      />
    </div>
  )
}

NetworksCustomRpc.propTypes = {
  setCustomNetworkValue: PropTypes.func.isRequired,
  saveCustomNetwork: PropTypes.func.isRequired,
  customNetworkRpc: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

NetworksCustomRpc.defaultProps = {
  placeholder: i18n.networkManager.placeholder.customNetwork,
}

export default NetworksCustomRpc
