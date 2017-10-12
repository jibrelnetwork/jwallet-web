import React from 'react'
import PropTypes from 'prop-types'

import JTable from 'components/base/JTable'
import AccountsTableBodyRow from './BodyRow'

const accountsTableHeaderItems = [
  { title: 'Name', name: 'accountName', colWidth: 'col--10' },
  { title: 'Actions', name: 'accountActions', colWidth: 'col--2', isReadOnly: true },
]

function AccountsTable(props) {
  const {
    setCurrentKeystoreAccount,
    removeKeystoreAccount,
    setKeystoreAccountName,
    setKeystoreAccountAddress,
    getKeystoreAddressesFromMnemonic,
    sortAccounts,
    openDerivationPathModal,
    setNewAccountName,
    setEditAccountName,
    selectAccountName,
    keystore,
  } = props

  const {
    accounts,
    newAccountNameData,
    currentAccount,
    addressesFromMnemonic,
    sortField,
    sortDirection,
  } = keystore

  return (
    <JTable name='accounts'>
      <JTable.Header
        items={accountsTableHeaderItems}
        onClick={sortAccounts}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <JTable.Body>
        {accounts.map((account) => {
          const { id, type, accountName, address, derivationPath, isReadOnly } = account

          return (
            <AccountsTableBodyRow
              key={id}
              setCurrentKeystoreAccount={setCurrentKeystoreAccount}
              removeKeystoreAccount={removeKeystoreAccount}
              setKeystoreAccountName={setKeystoreAccountName}
              setKeystoreAccountAddress={setKeystoreAccountAddress}
              getKeystoreAddressesFromMnemonic={getKeystoreAddressesFromMnemonic}
              openDerivationPathModal={openDerivationPathModal}
              setEditAccountName={setEditAccountName}
              setNewAccountName={setNewAccountName}
              selectAccountName={selectAccountName}
              newAccountNameData={newAccountNameData}
              addressesFromMnemonic={addressesFromMnemonic}
              id={id}
              type={type}
              accountName={accountName}
              derivationPath={derivationPath}
              address={address}
              isReadOnly={isReadOnly}
              isActive={id === currentAccount.id}
            />
          )
        })}
      </JTable.Body>
    </JTable>
  )
}

AccountsTable.propTypes = {
  setCurrentKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
  setKeystoreAccountName: PropTypes.func.isRequired,
  setKeystoreAccountAddress: PropTypes.func.isRequired,
  getKeystoreAddressesFromMnemonic: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  openDerivationPathModal: PropTypes.func.isRequired,
  setEditAccountName: PropTypes.func.isRequired,
  setNewAccountName: PropTypes.func.isRequired,
  selectAccountName: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    newAccountNameData: PropTypes.shape({
      accountId: PropTypes.string.isRequired,
      newAccountName: PropTypes.string.isRequired,
    }).isRequired,
    currentAccount: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    accounts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      accountName: PropTypes.string.isRequired,
      derivationPath: PropTypes.string,
      isReadOnly: PropTypes.bool,
    })).isRequired,
    addressesFromMnemonic: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    isDerivationPathModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AccountsTable
