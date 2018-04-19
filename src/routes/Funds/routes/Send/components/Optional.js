import React from 'react'
import PropTypes from 'prop-types'

import Expandable from 'components/Expandable'
import JInput from 'components/base/JInput'

const Optional = ({
  setGas,
  setGasPrice,
  setNonce,
  invalidFields,
  gas,
  gasPrice,
  nonce,
}) => {
  const fields = [
    { key: 'gas', value: gas, handler: setGas },
    { key: 'gasPrice', value: gasPrice, handler: setGasPrice },
    { key: 'nonce', value: nonce, handler: setNonce },
  ]

  return (
    <div className='optional'>
      <Expandable title='routes.sendFunds.optionalTitle' color='blue' >
        {fields.map(({ key, value, handler }) => (
          <JInput
            key={key}
            onChange={handler}
            value={value}
            name={`send-funds-${key}`}
            errorMessage={invalidFields[key]}
            placeholder={`routes.sendFunds.placeholder.${key}`}
            color='white'
          />
        ))}
      </Expandable>
    </div>
  )
}

Optional.propTypes = {
  setGas: PropTypes.func.isRequired,
  setGasPrice: PropTypes.func.isRequired,
  setNonce: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  gas: PropTypes.string.isRequired,
  gasPrice: PropTypes.string.isRequired,
  nonce: PropTypes.string.isRequired,
}

export default Optional
