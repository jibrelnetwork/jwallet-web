// @flow

import React from 'react'
import classNames from 'classnames'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

const JRadio = ({ toggle, children, name, isActive, isTopAligned }: Props) => (
  <div
    className={classNames('j-radio', isActive && '-active', isTopAligned && '-top')}
    onClick={ignoreEvent(toggle)(isActive)}
  >
    <div className='input'>
      <input type='radio' className='radio' name={`radio-${name}`} checked={isActive} readOnly />
      <label htmlFor={`radio-${name}`} className='label' />
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

JRadio.defaultProps = {
  children: null,
  isActive: false,
  isTopAligned: false,
}

export default JRadio
