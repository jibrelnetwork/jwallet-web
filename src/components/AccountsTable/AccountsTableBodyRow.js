import React from 'react'
import PropTypes from 'prop-types'

import JRadio from 'components/base/JRadio'

function AccountsTableBodyRow(props) {
  const {
    setCurrentKeystoreAccount,
    removeKeystoreAccount,
    setKeystoreAccountName,
    setKeystoreAccountAddress,
    getKeystoreAddressesFromMnemonic,
    addressesFromMnemonic,
    id,
    type,
    accountName,
    address,
    isReadOnly,
    isActive,
  } = props

  const accountType = (isReadOnly ? `${type}, READ ONLY` : type).toUpperCase()

  return (
    <div className='accounts-table-body-row table-row row' onClick={setCurrentKeystoreAccount(id)}>
      <JRadio
        toggle={setCurrentKeystoreAccount(id)}
        name={`toggle-${id} pull-left`}
        isActive={isActive}
      />
      <div className='account-row__info pull-left'>
        <div className='account-row__type'>{accountType}</div>
        <div className='account-row__account-name'>{accountName}</div>
      </div>
    </div>
  )
}

AccountsTableBodyRow.propTypes = {
  setCurrentKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  setKeystoreAccountName: PropTypes.func.isRequired,
  setKeystoreAccountAddress: PropTypes.func.isRequired,
  getKeystoreAddressesFromMnemonic: PropTypes.func.isRequired,
  addressesFromMnemonic: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  accountName: PropTypes.string.isRequired,
  address: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isActive: PropTypes.bool,
}

export default AccountsTableBodyRow
