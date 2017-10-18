import React from 'react'
import PropTypes from 'prop-types'

import JPopover from 'components/base/JPopover'

function AccountManagerPopover(props) {
  const {
    onClickOutside,
    setEditAccountName,
    removeKeystoreAccount,
    openDerivationPathModal,
    id,
    derivationPath,
  } = props

  const editDerivationPath = !openDerivationPathModal ? null : (
    <div className='popover__item' onClick={openDerivationPathModal}>
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

  return (
    <JPopover
      name='account-manager'
      onClickOutside={onClickOutside}
      body={body}
    />
  )
}

AccountManagerPopover.propTypes = {
  setEditAccountName: PropTypes.func.isRequired,
  removeKeystoreAccount: PropTypes.func.isRequired,
  openDerivationPathModal: PropTypes.func,
  onClickOutside: PropTypes.func,
}

AccountManagerPopover.defaultProps = {
  openEditDerivationPathModal: null,
  onClickOutside: null,
}

export default AccountManagerPopover
