import React from 'react'
import PropTypes from 'prop-types'

import JRadio from 'components/base/JRadio'

import AccountManager from '../../Manager'

function AccountsTableBodyRow(props) {
  const {
    setCurrentKeystoreAccount,
    removeKeystoreAccount,
    setKeystoreAccountName,
    setKeystoreAccountAddress,
    getKeystoreAddressesFromMnemonic,
    openDerivationPathModal,
    setEditAccountName,
    setNewAccountName,
    newAccountNameData,
    addressesFromMnemonic,
    id,
    type,
    accountName,
    derivationPath,
    address,
    isReadOnly,
    isActive,
  } = props

  const accountType = (isReadOnly ? `${type}, READ ONLY` : type).toUpperCase()

  return (
    <div className='accounts-table-body-row table-row row' onClick={setCurrentKeystoreAccount(id)}>
      <div className='table-body-item pull-left'>
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
      <div className='table-body-item pull-right'>
        <AccountManager
          setEditAccountName={setEditAccountName(id, accountName, true)}
          openDerivationPathModal={openDerivationPathModal(id, derivationPath)}
          removeKeystoreAccount={removeKeystoreAccount(id)}
        />
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
  openDerivationPathModal: PropTypes.func.isRequired,
  setEditAccountName: PropTypes.func.isRequired,
  setNewAccountName: PropTypes.func.isRequired,
  newAccountNameData: PropTypes.shape({
    newAccountName: PropTypes.string.isRequired,
    isEditAccountName: PropTypes.bool.isRequired,
  }).isRequired,
  addressesFromMnemonic: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  accountName: PropTypes.string.isRequired,
  address: PropTypes.string,
  derivationPath: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isActive: PropTypes.bool,
}

AccountsTableBodyRow.defaultProps = {
  address: '',
  derivationPath: '',
  isReadOnly: false,
  isActive: false,
}

export default AccountsTableBodyRow
