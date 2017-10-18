import React from 'react'
import PropTypes from 'prop-types'

function AccountInfoName(props) {
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
    return <div className='account-info-name'>{accountName}</div>
  }

  return (
    <div className='account-info-name account-name--input'>
      <input
        className='account-info-name__input'
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

AccountInfoName.propTypes = {
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

export default AccountInfoName
