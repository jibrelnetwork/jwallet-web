import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import JIcon from 'components/base/JIcon'

const { accountType } = i18n.modals.keystore.table

function AccountInfoType({ type, isReadOnly }) {
  const i18nType = accountType[type]
  const i18nReadOnly = accountType.readOnly
  const typeWithStatus = isReadOnly ? `${i18nType}, ${i18nReadOnly}` : i18nType

  const accountTypeReadOnlyIcon = !isReadOnly ? null : (
    <JIcon name='small-eye' className='account-info-type__icon' small />
  )

  return (
    <div className='account-info-type'>
      <div className='account-info-type__label'>{typeWithStatus}{accountTypeReadOnlyIcon}</div>
    </div>
  )
}

AccountInfoType.propTypes = {
  type: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
}

export default AccountInfoType
