// @flow

import React from 'react'

import { JButton, JInput } from 'components/base'
import { ButtonWithConfirm, ModalHeader } from 'components'

const CustomAsset = ({
  add,
  edit,
  remove,
  setName,
  setSymbol,
  setAddress,
  setDecimals,
  invalidFields,
  name,
  symbol,
  address,
  decimals,
  type,
}: Props) => {
  if (!['add', 'edit'].includes(type)) {
    return null
  }

  const isAdd: boolean = (type === 'add')

  const fields: Array<{
    handler: Function,
    key: string,
    value: string,
    disabled: boolean,
  }> = [
    { handler: setAddress, key: 'address', value: address, disabled: !isAdd },
    { handler: setName, key: 'name', value: name, disabled: false },
    { handler: setSymbol, key: 'symbol', value: symbol, disabled: false },
    { handler: setDecimals, key: 'decimals', value: decimals, disabled: false },
  ]

  return (
    <div className='custom-asset'>
      <div className='header'>
        <ModalHeader
          title={`${isAdd ? 'Add' : 'Edit'} Custom Asset`}
          color='gray'
          withMenu
        />
      </div>
      <div className='form'>
        {fields.map(({ key, value, handler, disabled }) => (
          <JInput
            key={key}
            onChange={handler}
            value={value}
            color='gray'
            name={`custom-asset-${key}`}
            placeholder={i18n(`routes.addCustomAsset.placeholder.${key}`)}
            errorMessage={invalidFields[key]}
            disabled={disabled}
          />
        ))}
        <div className='actions'>
          <div className='confirm'>
            <JButton
              onClick={isAdd ? add : edit}
              text={`${isAdd ? 'Add' : 'Save'} Asset`}
              color='white'
            />
          </div>
          {!isAdd && (
            <div className='remove'>
              <ButtonWithConfirm onClick={remove} label='Remove' labelConfirm='Confirm' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type Props = {
  add: Function,
  edit: Function,
  remove: Function,
  setName: Function,
  setSymbol: Function,
  setAddress: Function,
  setDecimals: Function,
  invalidFields: Object,
  name: string,
  symbol: string,
  address: string,
  decimals: string,
  type: string,
}

export default CustomAsset
