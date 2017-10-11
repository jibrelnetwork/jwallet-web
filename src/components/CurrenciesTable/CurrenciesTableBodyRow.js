import React from 'react'
import PropTypes from 'prop-types'

import JCheckbox from 'components/base/JCheckbox'

function CurrenciesTableBodyRow(props) {
  const {
    toggleActiveCurrency,
    symbol,
    name,
    balanceFixed,
    licensed,
    transfer,
    index,
    isActive,
  } = props

  return (
    <div
      className='table-row row clear'
      key={index}
      onClick={toggleActiveCurrency(index)(!isActive)}
    >
      <div className='table-body-item col col--2-4'>
        <JCheckbox toggle={toggleActiveCurrency(index)} isActive={isActive} label={symbol} />
      </div>
      <div className='table-body-item col col--3'>{name}</div>
      <div className='table-body-item col col--2'>{balanceFixed}</div>
      <div className='table-body-item col col--2'>{licensed}</div>
      <div className='table-body-item table-body-item--transfer col col--2-4'>{transfer}</div>
    </div>
  )
}

CurrenciesTableBodyRow.propTypes = {
  toggleActiveCurrency: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balanceFixed: PropTypes.string.isRequired,
  licensed: PropTypes.string.isRequired,
  transfer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default CurrenciesTableBodyRow
