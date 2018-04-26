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
  isLoading,
  isDisabled,
}: Props) => (
  <div
    className={classNames(
      'j-select',
      isOpen && '-active',
      current && '-value',
      isDisabled && '-disabled',
    )}
  >
    <div onClick={isDisabled ? null : handle(toggle)(!isOpen)} className='current'>
      <div className='label'>
        <JText value={label} color={color} size='small' fontCase='upper' />
      </div>
      <div className='placeholder'>
        <JText value={label} color={color} size='large' />
      </div>
      <div className='content'>
        {current && React.cloneElement(current, { isOpen, isLoading, isDisabled })}
      </div>
      <div className='chevron'>
        <JIcon name='expand' color={color} />
      </div>
    </div>
    <div onClick={handle(toggle)(false)} className='options'>
      <Scrollbars>
        {children}
      </Scrollbars>
    </div>
    {isOpen && <div onClick={handle(toggle)(false)} className='overlay' />}
  </div>
)

type Props = {
  toggle: Function,
  children: ?Object,
  current: ?Object,
  color: 'blue' | 'gray' | 'white',
  label: string,
  isOpen: boolean,
  isLoading: boolean,
  isDisabled: boolean,
}

JSelect.defaultProps = {
  toggle: () => {},
  children: null,
  current: null,
  color: 'white',
  label: '',
  isOpen: false,
  isLoading: false,
  isDisabled: false,
}

export default JSelect
