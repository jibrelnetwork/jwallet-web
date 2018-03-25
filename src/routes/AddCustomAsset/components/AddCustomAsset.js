import React from 'react'
import PropTypes from 'prop-types'

import ModalLayout from 'layouts/ModalLayout'
import ModalHeader from 'components/__new__/ModalHeader'
import { JButton, JInput } from 'components/base/__new__'

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
      <div className='modal-header-wrapper'>
        <ModalHeader title='Add custom asset' color='gray' withMenu />
      </div>
      <div className='content'>
        <div className='form'>
          {fields.map(({ key, value, handler }) => (
            <JInput
              key={key}
              onChange={handler}
              value={value}
              color='gray'
              name={`add-custom-asset-${key}`}
              placeholder={i18n(`routes.addCustomAsset.placeholder.${key}`)}
              errorMessage={invalidFields[key]}
            />
          ))}
          <div className='actions'>
            <JButton onClick={add} text='routes.addCustomAsset.buttonTitle' color='white' />
          </div>
        </div>
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
