// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'

type JPickerItemValue = number | string | Object

type Props = {|
  +onSelect: Function,
  +children: React$Node,
  +value: JPickerItemValue,
  +disabled: boolean,
|}

const JPickerItem = ({
  onSelect,
  children,
  value,
  disabled,
}: Props) => (
  <div
    onClick={disabled ? undefined : handle(onSelect)(value)}
    className={classNames('j-picker-item', disabled && '-disabled')}
  >
    {children}
  </div>
)

JPickerItem.defaultProps = {
  onSelect: () => {},
  children: {},
  value: 0,
  disabled: false,
}

export default JPickerItem
