import React from 'react'
import PropTypes from 'prop-types'

function AccountName(props) {
  const {
    setKeystoreAccountName,
    setNewAccountName,
    selectAccountName,
    newAccountNameData,
    id,
    accountName,
  } = props

  const { accountId, newAccountName } = newAccountNameData

  if (id !== accountId) {
    return <div className='account-name'>{accountName}</div>
  }

  return (
    <div className='account-name account-name--input'>
      <input
        className='account-name__input'
        type='text'
        placeholder='New name'
        value={newAccountName}
        onChange={setNewAccountName}
        onBlur={setKeystoreAccountName(accountId, newAccountName)}
        onFocus={selectAccountName}
        autoFocus
      />
    </div>
  )
}

AccountName.propTypes = {
  setKeystoreAccountName: PropTypes.func.isRequired,
  setNewAccountName: PropTypes.func.isRequired,
  selectAccountName: PropTypes.func.isRequired,
  newAccountNameData: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    newAccountName: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  accountName: PropTypes.string.isRequired,
}

export default AccountName
