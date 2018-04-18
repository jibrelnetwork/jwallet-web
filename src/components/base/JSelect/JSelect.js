// @flow

import React from 'react'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JText } from 'components/base'

const JSelect = ({
  toggle,
  children,
  current,
  color,
  label,
  isOpen,
  disabled,
}: Props) => (
  <div
    className={classNames(
      'j-select',
      isOpen && '-active',
      current && '-value',
      disabled && '-disabled',
    )}
  >
    <div className='current' onClick={disabled ? null : handle(toggle)(!isOpen)}>
      <div className='label'>
        <JText value={label} color={color} size='small' fontCase='upper' />
      </div>
      <div className='placeholder'>
        <JText value={label} color={color} size='large' />
      </div>
      <div className='content'>
        {current && React.cloneElement(current, { isOpen, disabled })}
      </div>
      <div className='chevron'>
        <JIcon name='expand' color={color} />
      </div>
    </div>
    <div className='options' onClick={handle(toggle)(false)}>
      <Scrollbars>
        {children}
      </Scrollbars>
    </div>
  </div>
)

type Props = {
  toggle: Function,
  children: ?Object,
  current: ?Object,
  color: 'blue' | 'gray' | 'white',
  label: string,
  isOpen: bool,
  disabled: bool,
}

JSelect.defaultProps = {
  toggle: () => {},
  children: null,
  current: null,
  color: 'white',
  label: '',
  isOpen: false,
  disabled: false,
}

export default JSelect
