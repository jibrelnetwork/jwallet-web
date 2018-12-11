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
    <div onClick={isDisabled ? undefined : handle(toggle)(!isOpen)} className='current'>
      <div className='label'>
        <JText value={label} color={color} size='small' />
      </div>
      <div className='placeholder'>
        <JText value={label} color={color} size='semilarge' whiteSpace='wrap' />
      </div>
      <div className='content'>
        {current && React.cloneElement(current, { isOpen, isLoading, isDisabled })}
      </div>
      <div className='chevron'>
        <JIcon name={isOpen ? 'chevron-up' : 'chevron-down'} color='blue' size='medium' />
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
  color: 'white',
  isOpen: false,
  isLoading: false,
  isDisabled: false,
}

export default JSelect
