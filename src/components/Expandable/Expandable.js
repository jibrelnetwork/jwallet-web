// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/handle'
import { JIcon, JText } from 'components/base'

const Expandable = ({
  toggle,
  children,
  title,
  isOpen,
  color = 'blue',
  iconName = 'plus',
}: Props) => (
  <div className={classNames('expandable', `-${color}`, { '-open': isOpen })}>
    <div className='title' onClick={handle(toggle)(!isOpen)}>
      <JIcon size='small' color={color} name={isOpen ? 'arrow-down' : iconName} />
      <div className='label'>
        <JText
          variants={['bold', color]}
          value={title || 'modals.customOptionsTitle'}
        />
      </div>
    </div>
    <div className='content'>{children}</div>
  </div>
)

type Props = {
  toggle: Function,
  children: Object,
  isOpen: boolean,
  title?: string,
  color?: string,
  iconName?: string,
}

Expandable.defaultProps = {
  title: null,
  color: 'blue',
  iconName: 'plus',
}

export default Expandable
