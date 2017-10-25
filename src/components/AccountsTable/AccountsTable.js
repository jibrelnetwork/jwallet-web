import React from 'react'
import PropTypes from 'prop-types'

import JTable from 'components/base/JTable'
import Account from './Account'

const accountsTableHeaderItems = [
  { title: 'Name', name: 'accountName', colWidth: 'col--10' },
  { title: 'Actions', name: 'accountActions', colWidth: 'col--2', isReadOnly: true },
]

function AccountsTable(props) {
  const {
    setCurrentKeystoreAccount,
    removeKeystoreAccount,
    setKeystoreAccountName,
    setKeystoreAccountAddressIndex,
    getAddressesFromMnemonic,
    sortAccounts,
    openNewDerivationPathModal,
    setNewAccountName,
    setEditAccountName,
    selectAccountName,
    accounts,
    newAccountNameData,
    addressesFromMnemonic,
    currentAccountId,
    sortField,
    sortDirection,
  } = props

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
          const { id, type, accountName, derivationPath, addressIndex, isReadOnly } = account

          return (
            <Account key={id}>
              <Account.Info
                setCurrentKeystoreAccount={setCurrentKeystoreAccount(id)}
                setKeystoreAccountName={setKeystoreAccountName}
                setKeystoreAccountAddressIndex={setKeystoreAccountAddressIndex}
                getAddressesFromMnemonic={getAddressesFromMnemonic}
                setNewAccountName={setNewAccountName}
                selectAccountName={selectAccountName}
                newAccountNameData={newAccountNameData}
                addressesFromMnemonic={addressesFromMnemonic}
                id={id}
                type={type}
                accountName={accountName}
                addressIndex={addressIndex}
                isReadOnly={isReadOnly}
                isActive={currentAccountId === id}
              />
              <Account.Manager
                removeAccount={removeKeystoreAccount(id)}
                editName={setEditAccountName(id, accountName)}
                setDerivationPath={openNewDerivationPathModal(id, derivationPath)}
                isMnemonic={(type === 'mnemonic') && !isReadOnly}
              />
            </Account>
          )
        })}
      </JTable.Body>
    </JTable>
  )
}

AccountsTable.propTypes = {
  setCurrentKeystoreAccount: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  setKeystoreAccountName: PropTypes.func.isRequired,
  setKeystoreAccountAddressIndex: PropTypes.func.isRequired,
  getAddressesFromMnemonic: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  openNewDerivationPathModal: PropTypes.func.isRequired,
  setEditAccountName: PropTypes.func.isRequired,
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
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    derivationPath: PropTypes.string,
    addressIndex: PropTypes.number,
    isReadOnly: PropTypes.bool,
  })).isRequired,
  currentAccountId: PropTypes.string.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
}

export default AccountsTable
