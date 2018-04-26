// @flow

import React from 'react'

import Expandable from 'components/Expandable'

import Item from './OptionalItem'

const SendOptional = ({
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
    <div className='send-optional'>
      <Expandable title='routes.sendFunds.optionalTitle' color='blue' orientation='row' >
        {fields.map(({ key, value, handler }) => (
          <Item
            key={key}
            value={value}
            handler={handler}
            name={`send-funds-${key}`}
            errorMessage={invalidFields[key]}
            placeholder={`routes.sendFunds.placeholder.${key}`}
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

export default SendOptional
