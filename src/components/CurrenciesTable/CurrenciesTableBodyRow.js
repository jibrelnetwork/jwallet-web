import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import JCheckbox from 'components/base/JCheckbox'

const { licensedValue, transferValue } = i18n.modals.assetManager.table

function CurrenciesTableBodyRow(props) {
  const {
    toggleActiveCurrency,
    symbol,
    name,
    balanceFixed,
    index,
    isAuthRequired,
    isLicensed,
    isActive,
  } = props

  const itemClassName = 'table-body-item table-body-item'
  const licensed = isLicensed ? licensedValue.yes : licensedValue.no
  const transfer = isAuthRequired ? transferValue.authorized : transferValue.notAuthorized

  return (
    <div
      className='table-row row clear'
      key={index}
      onClick={toggleActiveCurrency(index)(!isActive)}
    >
      <div className={`${itemClassName}--symbol col col--2-4`}>
        <JCheckbox toggle={toggleActiveCurrency(index)} isActive={isActive} label={symbol} />
      </div>
      <div className={`${itemClassName}--name col col--3`}>{name}</div>
      <div className={`${itemClassName}--balance col col--2`}>{balanceFixed}</div>
      <div className={`${itemClassName}--licensed col col--2`}>{licensed}</div>
      <div className={`${itemClassName}--transfer col col--2-4`}>{transfer}</div>
    </div>
  )
}

CurrenciesTableBodyRow.propTypes = {
  toggleActiveCurrency: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balanceFixed: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isAuthRequired: PropTypes.bool.isRequired,
  isLicensed: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default CurrenciesTableBodyRow
