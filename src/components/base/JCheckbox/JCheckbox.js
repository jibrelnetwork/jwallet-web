// @flow

import React from 'react'
import classNames from 'classnames'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

const JCheckbox = ({ toggle, children, name, isActive, isTopAligned }: Props) => (
  <div
    className={classNames('j-checkbox', isActive && '-active', isTopAligned && '-top')}
    onClick={ignoreEvent(toggle)(isActive)}
  >
    <div className='input'>
      <input
        type='checkbox'
        className='checkbox'
        name={`checkbox-${name}`}
        checked={isActive}
        readOnly
      />
      <label htmlFor={`checkbox-${name}`} className='label' />
    </div>
    <div className='content'>
      {children}
    </div>
  </div>
)

type Props = {
  toggle: Function,
  children: ?Object,
  name: number | string,
  isActive: boolean,
  isTopAligned: boolean,
}

JCheckbox.defaultProps = {
  children: null,
  isActive: false,
  isTopAligned: false,
}

export default JCheckbox
