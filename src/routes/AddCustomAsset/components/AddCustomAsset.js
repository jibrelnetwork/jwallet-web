import React from 'react'
import PropTypes from 'prop-types'

import JTextInput from 'components/base/JTextInput'

const AddCustomAsset = ({
  setAddress,
  setName,
  setSymbol,
  setDecimals,
  invalidFields,
  address,
  name,
  symbol,
  decimals,
}) => {
  const fields = [
    { title: 'address', value: address, handler: setAddress },
    { title: 'name', value: name, handler: setName },
    { title: 'symbol', value: symbol, handler: setSymbol },
    { title: 'decimals', value: decimals, handler: setDecimals },
  ]

  return (
    <div className='add-custom-asset-view'>
      {fields.map(({ title, value, handler }) => (
        <JTextInput
          key={title}
          onValueChange={handler}
          name={`add-custom-asset-${title}`}
          placeholder={i18n(`modals.addCustomToken.placeholder.${title}`)}
          value={value}
          errorMessage={invalidFields[title]}
          editable
        />
      ))}
    </div>
  )
}

AddCustomAsset.propTypes = {
  setAddress: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setSymbol: PropTypes.func.isRequired,
  setDecimals: PropTypes.func.isRequired,
  // add: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
}

export default AddCustomAsset
