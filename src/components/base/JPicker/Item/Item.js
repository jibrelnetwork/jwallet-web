// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'

const Item = ({ onSelect, children, value, disabled }: Props) => (
  <div
    onClick={disabled ? undefined : handle(onSelect)(value)}
    className={classNames('j-picker-item', disabled && '-disabled')}
  >
    {children}
  </div>
)

type Props = {
  onSelect: Function,
  children: Object,
  value: number | string | Object,
  disabled: boolean,
}

Item.defaultProps = {
  onSelect: () => {},
  children: {},
  value: 0,
  disabled: false,
}

export default Item
