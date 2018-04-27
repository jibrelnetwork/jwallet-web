// @flow

import React from 'react'

import JInput from 'components/base/JInput'
import Expandable from 'components/Expandable'

const Optional = ({
  setGas,
  setGasPrice,
  setNonce,
  invalidFields,
  gas,
  gasPrice,
  nonce,
}: Props) => {
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

type Props = {
  setGas: Function,
  setGasPrice: Function,
  setNonce: Function,
  invalidFields: FormFields,
  gas: string,
  gasPrice: string,
  nonce: string,
}

export default Optional
