// @flow

import React from 'react'
import { JInput } from 'react-components'

const FundsConvertView = ({
  setToAsset,
  setFromAsset,
  setFromAmount,
  invalidFields,
  toAsset,
  toAmount,
  fromAsset,
  fromAmount,
}: Props) => {
  const fields = [
    { key: 'fromAsset', value: fromAsset, placeholder: 'Asset', handler: setFromAsset },
    { key: 'fromAmount', value: fromAmount, placeholder: 'Amount', handler: setFromAmount },
    { key: 'toAsset', value: toAsset, placeholder: 'Convert to', handler: setToAsset },
    { key: 'toAmount', value: toAmount, placeholder: 'You will receive', handler: null },
  ]

  return (
    <div className='convert-funds-view'>
      {fields.map(({ key, value, placeholder, handler }) => (
        <JInput
          key={key}
          onChange={handler}
          name={`convert-funds-${key}`}
          placeholder={placeholder}
          value={value}
          errorMessage={invalidFields[key]}
        />
      ))}
    </div>
  )
}

type Props = {
  setToAsset: Function,
  setFromAsset: Function,
  setFromAmount: Function,
  invalidFields: FormFields,
  toAsset: Address,
  toAmount: string,
  fromAsset: Address,
  fromAmount: string,
}

export default FundsConvertView
