import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import JIcon from 'components/base/JIcon'

function CurrenciesManager({ iconName, className, onClick }) {
  return (
    <JIcon
      name={iconName}
      className={className}
      title={i18n.digitalAssets.iconTitle}
      onClick={onClick}
    />
  )
}

CurrenciesManager.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default CurrenciesManager
