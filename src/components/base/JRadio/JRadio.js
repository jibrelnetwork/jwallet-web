// @flow

import React from 'react'
import classNames from 'classnames'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

const JRadio = ({ toggle, children, name, isActive }: Props) => (
  <div
    className={classNames('j-radio', isActive && '-active')}
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
}

JRadio.defaultProps = {
  toggle: () => {},
  children: null,
  name: 0,
  isActive: false,
}

export default JRadio
