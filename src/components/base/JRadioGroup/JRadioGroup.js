/* @flow */

import React from 'react'

import Radio from './Radio'
import Input from './Input'

const JRadioGroup = ({
  items,
  onChange,
  customItem,
  checkedItem,
}: Props) => (
  <div className='JRadioGroup' >
    {items.map((item, index) => (
      <div
        key={index}
        className='radio'
      >
        <Radio
          {...item}
          index={index}
          checked={index === checkedItem}
          onChange={onChange}
        />
      </div>
    ))}
    {customItem && (
      <div className='input'>
        <Input
          {...customItem}
          checked={checkedItem === 'custom'}
          onChange={onChange}
        />
      </div>
    )}
  </div>
)

type Props = {
  items: Array<{
    text: string,
    description: string,
  }>,
  customItem?: {
    validators: Array<{
      message: string,
      rule: (value: string) => boolean,
    }>,
    placeholder: string,
  },
  onChange: (id: string | number, value?: string) => void,
  checkedItem: number | string,
}

JRadioGroup.defaultProps = {
  customItem: undefined,
}

export default JRadioGroup
