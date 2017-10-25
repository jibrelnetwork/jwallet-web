import React from 'react'
import PropTypes from 'prop-types'

import JRadio from 'components/base/JRadio'

import AccountInfoName from './Name'
import AccountInfoMnemonicAddresses from './MnemonicAddresses'

function AccountInfo(props) {
  const {
    setCurrentKeystoreAccount,
    setKeystoreAccountName,
    setKeystoreAccountAddressIndex,
    getAddressesFromMnemonic,
    setNewAccountName,
    selectAccountName,
    newAccountNameData,
    addressesFromMnemonic,
    id,
    type,
    accountName,
    addressIndex,
    isReadOnly,
    isActive,
  } = props

  const accountType = (isReadOnly ? `${type}, READ ONLY` : type).toUpperCase()
  const isMnemonicAndActive = ((type === 'mnemonic') && isActive)

  return (
    <div className='account-info-container table-body-item pull-left col col--10'>
      <JRadio toggle={setCurrentKeystoreAccount} name={`toggle-${id}`} isActive={isActive} />
      <div className='account-info account-info--active-mnemonic'>
        <div className='account-info__title' onClick={setCurrentKeystoreAccount}>
          <div className='account-info-type'>{accountType}</div>
          <AccountInfoName
            setKeystoreAccountName={setKeystoreAccountName}
            setNewAccountName={setNewAccountName}
            selectAccountName={selectAccountName}
            newAccountNameData={newAccountNameData}
            id={id}
            accountName={accountName}
          />
        </div>
        <AccountInfoMnemonicAddresses
          setKeystoreAccountAddressIndex={setKeystoreAccountAddressIndex}
          getAddressesFromMnemonic={getAddressesFromMnemonic}
          addressesFromMnemonic={addressesFromMnemonic}
          id={id}
          addressIndex={addressIndex}
          isActive={isMnemonicAndActive}
        />
      </div>
    </div>
  )
}

AccountInfo.propTypes = {
  setCurrentKeystoreAccount: PropTypes.func.isRequired,
  setKeystoreAccountAddressIndex: PropTypes.func.isRequired,
  getAddressesFromMnemonic: PropTypes.func.isRequired,
  setKeystoreAccountName: PropTypes.func.isRequired,
  setNewAccountName: PropTypes.func.isRequired,
  selectAccountName: PropTypes.func.isRequired,
  newAccountNameData: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    newAccountName: PropTypes.string.isRequired,
  }).isRequired,
  addressesFromMnemonic: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentIteration: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  accountName: PropTypes.string.isRequired,
  addressIndex: PropTypes.number,
  isReadOnly: PropTypes.bool,
  isActive: PropTypes.bool,
}

AccountInfo.defaultProps = {
  addressIndex: 0,
  isReadOnly: false,
  isActive: false,
}

export default AccountInfo
