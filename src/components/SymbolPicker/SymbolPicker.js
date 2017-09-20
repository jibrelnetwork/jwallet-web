import React from 'react'
import PropTypes from 'prop-types'

import JPicker from 'components/base/JPicker'

function SymbolPicker({ onValueChange, selectedValue, name, enabled }) {
  return (
    <JPicker
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      name={name}
      placeholder=''
      errorMessage=''
      successMessage=''
      enabled={enabled}
    >
      <JPicker.Item label='ETH' value='ETH' />
      <JPicker.Item label='USD' value='USD' />
    </JPicker>
  )
}

SymbolPicker.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
}

export default SymbolPicker
