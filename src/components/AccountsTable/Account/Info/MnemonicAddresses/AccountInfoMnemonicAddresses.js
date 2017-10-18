import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JRadio from 'components/base/JRadio'

class AccountInfoMnemonicAddresses extends Component {
  constructor(props) {
    super(props)
    this.state = { password: 'qwert12345!Q' }
  }

  componentDidMount() {
    const { getAddressesFromMnemonic, addressesFromMnemonic, id, isActive } = this.props

    if (!isActive) {
      return
    }

    if (addressesFromMnemonic.items.length) {
      return
    }

    getAddressesFromMnemonic(this.state.password, id, 0)()
  }

  render() {
    const {
      setKeystoreAccountAddress,
      getAddressesFromMnemonic,
      addressesFromMnemonic,
      id,
      address,
      isActive,
    } = this.props

    const { password } = this.state
    const { items, currentIteration } = addressesFromMnemonic

    if (!isActive) {
      return null
    }

    return (
      <div className='account-info-mnemonic-addresses'>
        {items.map((mnemonicAddress, index) => {
          const active = (mnemonicAddress === address)
          const setAddress = active ? null : setKeystoreAccountAddress(password, id, index)

          return (
            <div className='mnemonic-address-container' key={index}>
              <JRadio toggle={setAddress} name={`toggle-${mnemonicAddress}`} isActive={active} />
              <div className='mnemonic-address' onClick={setAddress}>{mnemonicAddress}</div>
            </div>
          )
        })}
        <div>
          <span
            className='get-more'
            onClick={getAddressesFromMnemonic(password, id, currentIteration)}
          >
            {'Get more'}
          </span>
        </div>
      </div>
    )
  }
}

AccountInfoMnemonicAddresses.propTypes = {
  setKeystoreAccountAddress: PropTypes.func.isRequired,
  getAddressesFromMnemonic: PropTypes.func.isRequired,
  addressesFromMnemonic: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentIteration: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  address: PropTypes.string,
  isActive: PropTypes.bool,
}

AccountInfoMnemonicAddresses.defaultProps = {
  address: null,
  isActive: false,
}

export default AccountInfoMnemonicAddresses
