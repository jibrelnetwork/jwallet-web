// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/eventHandlers/handle'
import JFlatButton from 'components/base/JFlatButton'

const Expandable = ({ toggle, children, title, isOpen, color, iconName }: Props) => (
  <div className={classNames('expandable', `-${color}`, { '-open': isOpen })}>
    <div className='title'>
      <JFlatButton
        onClick={handle(toggle)(!isOpen)}
        text={title || 'modals.customOptionsTitle'}
        color={color}
        iconName={isOpen ? 'arrow-down' : iconName}
      />
    </div>
    <div className='content'>{children}</div>
  </div>
)

type Props = {
  toggle: Function,
  children: ?Object,
  color: 'blue' | 'white',
  title: ?string,
  iconName: string,
  isOpen: boolean,
}

Expandable.defaultProps = {
  toggle: () => {},
  children: null,
  color: 'white',
  title: null,
  iconName: 'plus',
  isOpen: false,
}

export default Expandable
