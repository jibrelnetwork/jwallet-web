// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
import { JIcon, JText } from 'components/base'

const Expandable = ({
  toggle,
  setHovered,
  children,
  title,
  color,
  orientation,
  iconNameOpened,
  iconNameClosed,
  isOpen,
  isHovered,
}: Props) => {
  const hoverColor = (color === 'blue') ? 'sky' : 'white'

  return (
    <div className={classNames(`expandable -${color} -${orientation}`, isOpen && '-open')}>
      <div
        className='title'
        onClick={handle(toggle)(!isOpen)}
        onMouseEnter={handle(setHovered)(true)}
        onMouseLeave={handle(setHovered)(false)}
      >
        <div className='icon'>
          <JIcon
            color={isHovered ? hoverColor : color}
            name={isOpen ? iconNameOpened : iconNameClosed}
            size='small'
          />
        </div>
        <div className='text'>
          <JText
            value={title}
            color={isHovered ? hoverColor : color}
            weight='bold'
          />
        </div>
      </div>
      <div className='content'>{children}</div>
    </div>
  )
}

type Props = {
  toggle: Function,
  setHovered: Function,
  children: ?React$Node,
  title: string,
  iconNameOpened: string,
  iconNameClosed: string,
  color: 'blue' | 'white',
  orientation: 'row' | 'column',
  isOpen: boolean,
  isHovered: boolean,
}

Expandable.defaultProps = {
  color: 'white',
  orientation: 'column',
  iconNameOpened: 'arrow-down',
  iconNameClosed: 'plus',
  title: 'modals.customOptionsTitle',
}

export default Expandable
