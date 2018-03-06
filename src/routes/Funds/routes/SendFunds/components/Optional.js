import React from 'react'
import PropTypes from 'prop-types'

import Expandable from 'components/Expandable'
import JTextInput from 'components/base/JTextInput'

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
    <Expandable title={i18n('routes.sendFunds.optionalTitle')} >
      {fields.map(({ key, value, handler }) => (
        <JTextInput
          key={key}
          onValueChange={handler}
          name={`send-funds-${key}`}
          placeholder={i18n(`routes.sendFunds.placeholder.${key}`)}
          value={value}
          errorMessage={invalidFields[key]}
          editable
        />
      ))}
    </Expandable>
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
