// @flow

import React from 'react'
import classNames from 'classnames'
import { JIcon, JText } from 'react-components'

import handle from 'utils/eventHandlers/handle'

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
            Size='small'
          />
        </div>
        <div className='text'>
          <JText
            value={i18n(title)}
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
  children: ?Object,
  title: string,
  iconNameClosed: string,
  iconNameOpened: string,
  color: 'blue' | 'white',
  orientation: 'row' | 'column',
  isOpen: boolean,
  isHovered: boolean,
}

Expandable.defaultProps = {
  orientation: 'column',
  iconNameClosed: 'plus',
  iconNameOpened: 'arrow-down',
  title: 'modals.customOptionsTitle',
}

export default Expandable
