import React from 'react'
import PropTypes from 'prop-types'

import JPopover from 'components/base/JPopover'

function AccountManagerPopover(props) {
  const {
    onClickOutside,
    setEditAccountName,
    removeKeystoreAccount,
    openNewDerivationPathModal,
    isMnemonicType,
  } = props

  const editDerivationPath = !isMnemonicType ? null : (
    <div className='popover__item' onClick={openNewDerivationPathModal}>
      {'Edit derivation path'}
    </div>
  )

  const body = (
    <div className='account-manager-popover'>
      <div className='popover__item' onClick={setEditAccountName}>{'Edit name'}</div>
      {editDerivationPath}
      <div className='popover__item popover__item--gray' onClick={removeKeystoreAccount}>
        {'Clear key'}
      </div>
    </div>
  )

  return <JPopover name='account-manager' onClickOutside={onClickOutside} body={body} />
}

AccountManagerPopover.propTypes = {
  setEditAccountName: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  openNewDerivationPathModal: PropTypes.func.isRequired,
  isMnemonicType: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func,
}

export default AccountManagerPopover
