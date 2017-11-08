import React from 'react'
import PropTypes from 'prop-types'

import JPicker from 'components/base/JPicker'

function SymbolPicker({ onValueChange, items, selectedValue, name, enabled }) {
  return (
    <JPicker
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      name={name}
      placeholder=''
      errorMessage=''
      successMessage=''
      enabled={enabled && !!items.length}
    >
      {items.map(item => <JPicker.Item key={item} label={item} value={item} />)}
    </JPicker>
  )
}

SymbolPicker.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
}

export default SymbolPicker
