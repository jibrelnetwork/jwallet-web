import React from 'react'
import PropTypes from 'prop-types'

import JTextInput from 'components/base/JTextInput'

const ConvertFunds = ({
  setFromAsset,
  setFromAmount,
  setToAsset,
  // convert,
  invalidFields,
  fromAsset,
  fromAmount,
  toAsset,
  toAmount,
}) => {
  const fields = [
    { key: 'fromAsset', value: fromAsset, placeholder: 'Asset', handler: setFromAsset },
    { key: 'fromAmount', value: fromAmount, placeholder: 'Amount',  handler: setFromAmount },
    { key: 'toAsset', value: toAsset, placeholder: 'Convert to', handler: setToAsset },
    { key: 'toAmount', value: toAmount, placeholder: 'You will receive', handler: null },
  ]

  return (
    <div className='convert-funds-view'>
      {fields.map(({ key, value, placeholder, handler }) => (
        <JTextInput
          key={key}
          onValueChange={handler}
          name={`convert-funds-${key}`}
          placeholder={placeholder}
          value={value}
          errorMessage={invalidFields[key]}
          editable={!!handler}
        />
      ))}
    </div>
  )
}

ConvertFunds.propTypes = {
  setFromAsset: PropTypes.func.isRequired,
  setFromAmount: PropTypes.func.isRequired,
  setToAsset: PropTypes.func.isRequired,
  // convert: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  fromAsset: PropTypes.string.isRequired,
  fromAmount: PropTypes.string.isRequired,
  toAsset: PropTypes.string.isRequired,
  toAmount: PropTypes.string.isRequired,
}

export default ConvertFunds
