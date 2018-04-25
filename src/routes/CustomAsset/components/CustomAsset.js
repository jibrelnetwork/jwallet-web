// @flow

import React from 'react'

import { JInput, JRaisedButton } from 'components/base'
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
    isDisabled: boolean,
  }> = [
    { handler: setAddress, key: 'address', value: address, isDisabled: !isAdd },
    { handler: setName, key: 'name', value: name, isDisabled: false },
    { handler: setSymbol, key: 'symbol', value: symbol, isDisabled: false },
    { handler: setDecimals, key: 'decimals', value: decimals, isDisabled: false },
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
        {fields.map(({ key, value, handler, isDisabled }) => (
          <JInput
            key={key}
            onChange={handler}
            value={value}
            name={`custom-asset-${key}`}
            errorMessage={invalidFields[key]}
            placeholder={`routes.addCustomAsset.placeholder.${key}`}
            type='text'
            color='gray'
            isDisabled={isDisabled}
          />
        ))}
        <div className='actions'>
          <div className='confirm'>
            <JRaisedButton
              onClick={isAdd ? add : edit}
              label={`${isAdd ? 'Add' : 'Save'} Asset`}
              labelColor='blue'
              isWide
            />
          </div>
          {!isAdd && (
            <div className='remove'>
              <ButtonWithConfirm
                onClick={remove}
                label='Remove'
                labelCancel='Nope!'
                labelConfirm='Confirm'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type Props = {
  add: ?Function,
  edit: ?Function,
  remove: Function,
  setName: Function,
  setSymbol: Function,
  setAddress: Function,
  setDecimals: Function,
  invalidFields: FormFields,
  name: string,
  symbol: string,
  address: string,
  decimals: string,
  type: 'add' | 'edit',
}

CustomAsset.defaultProps = {
  add: null,
  edit: null,
  type: 'add',
}

export default CustomAsset
