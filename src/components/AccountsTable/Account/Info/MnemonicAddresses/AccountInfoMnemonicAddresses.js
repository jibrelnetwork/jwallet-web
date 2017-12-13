import React from 'react'
import PropTypes from 'prop-types'

import JRadio from 'components/base/JRadio'

function AccountInfoMnemonicAddresses(props) {
  const {
    setKeystoreAccountAddressIndex,
    getAddressesFromMnemonic,
    addressesFromMnemonic,
    id,
    addressIndex,
    isActive,
  } = props

  const { items, currentIteration } = addressesFromMnemonic

  if (!isActive) {
    return null
  }

  return (
    <div className='account-info-mnemonic-addresses'>
      {items.map((mnemonicAddress, index) => {
        const active = (index === addressIndex)
        const setAddress = active ? null : setKeystoreAccountAddressIndex(id, index)

        return (
          <div className='mnemonic-address-container' key={index}>
            <JRadio toggle={setAddress} name={`toggle-${mnemonicAddress}`} isActive={active} />
            <div className='mnemonic-address' onClick={setAddress}>{mnemonicAddress}</div>
          </div>
        )
      })}
      <div className='get-more-wrap'>
        <span className='get-more' onClick={getAddressesFromMnemonic(id, currentIteration)}>
          {i18n('modals.keystore.getMoreTitle')}
        </span>
      </div>
    </div>
  )
}

AccountInfoMnemonicAddresses.propTypes = {
  setKeystoreAccountAddressIndex: PropTypes.func.isRequired,
  getAddressesFromMnemonic: PropTypes.func.isRequired,
  addressesFromMnemonic: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentIteration: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  addressIndex: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default AccountInfoMnemonicAddresses
