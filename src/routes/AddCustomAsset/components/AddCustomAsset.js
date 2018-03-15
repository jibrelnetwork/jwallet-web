import React from 'react'
import PropTypes from 'prop-types'

import ModalLayout from 'layouts/ModalLayout'
import JTextInput from 'components/base/JTextInput'
import JButton from 'components/base/__new__/JButton'

const AddCustomAsset = ({
  setName,
  setAddress,
  setSymbol,
  setDecimals,
  add,
  invalidFields,
  name,
  address,
  symbol,
  decimals,
}) => {
  const fields = [
    { key: 'name', value: name, handler: setName },
    { key: 'address', value: address, handler: setAddress },
    { key: 'symbol', value: symbol, handler: setSymbol },
    { key: 'decimals', value: decimals, handler: setDecimals },
  ]

  return (
    <ModalLayout>
      <div className='add-custom-asset-view'>
        {fields.map(({ key, value, handler }) => (
          <JTextInput
            key={key}
            onValueChange={handler}
            name={`add-custom-asset-${key}`}
            placeholder={i18n(`routes.addCustomAsset.placeholder.${key}`)}
            value={value}
            errorMessage={invalidFields[key]}
            editable
          />
        ))}
        <JButton onClick={add} text='routes.addCustomAsset.buttonTitle' color='white' />
      </div>
    </ModalLayout>
  )
}

AddCustomAsset.propTypes = {
  setName: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setSymbol: PropTypes.func.isRequired,
  setDecimals: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
}

export default AddCustomAsset
