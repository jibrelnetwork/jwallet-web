// @flow

import * as React from 'react'
import classNames from 'classnames'

import jPickerItemStyle from './jPickerListItem.m.scss'

type Props = {|
  +isSelected: boolean,
  +isFocused: boolean,
  +onBlur: () => any,
  +onFocus: () => any,
  +onClick: (SyntheticEvent<HTMLDivElement>) => any,
  +children: React$Node,
|}

function JPickerListItem({
  isSelected,
  isFocused,
  onClick,
  onFocus,
  onBlur,
  children,
}: Props) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      className={classNames(
        jPickerItemStyle.core,
        isSelected && jPickerItemStyle.selected,
        isFocused && jPickerItemStyle.focused,
      )}
    >
      {children}
    </div>
  )
}

JPickerListItem.defaultProps = {
  isSelected: false,
  isFocused: false,
}

export { JPickerListItem }
