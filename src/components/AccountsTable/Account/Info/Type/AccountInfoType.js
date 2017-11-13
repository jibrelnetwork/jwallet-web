import React from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

function AccountInfoType({ type, isReadOnly }) {
  const accountType = (isReadOnly ? `${type}, READ ONLY` : type).toUpperCase()

  const accountTypeReadOnlyIcon = !isReadOnly ? null : (
    <JIcon name='small-eye' className='account-info-type__icon' small />
  )

  return (
    <div className='account-info-type'>
      <div className='account-info-type__label'>{accountType}{accountTypeReadOnlyIcon}</div>
    </div>
  )
}

AccountInfoType.propTypes = {
  type: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
}

export default AccountInfoType
