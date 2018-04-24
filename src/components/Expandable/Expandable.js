// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
import JFlatButton from 'components/base/JFlatButton'

const Expandable = ({
  toggle,
  children,
  title,
  color,
  iconNameOpened,
  iconNameClosed,
  isOpen,
}: Props) => (
  <div className={classNames('expandable', `-${color}`, isOpen && '-open')}>
    <div className='title'>
      <JFlatButton
        onClick={handle(toggle)(!isOpen)}
        label={title}
        color={color}
        iconColor={color}
        iconName={isOpen ? iconNameOpened : iconNameClosed}
        iconSize='small'
      />
    </div>
    <div className='content'>{children}</div>
  </div>
)

type Props = {
  toggle: Function,
  children: ?Object,
  color: 'blue' | 'white',
  title: string,
  iconName: string,
  isOpen: boolean,
}

Expandable.defaultProps = {
  children: null,
  color: 'white',
  iconNameOpened: 'plus',
  iconNameClosed: 'arrow-down',
  title: 'modals.customOptionsTitle',
  isOpen: false,
}

export default Expandable
