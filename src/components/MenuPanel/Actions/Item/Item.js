// @flow

import React, {
  Fragment,
  PureComponent,
} from 'react'

import {
  JIcon,
  JText,
  JLink,
} from 'components/base'

type MenuPanelActionsItemHandler = () => void

type Props = {|
  +onClick: ?MenuPanelActionsItemHandler,
  +path: ?string,
  +icon: string,
  +label: string,
|}

class MenuPanelActionsItem extends PureComponent<Props> {
  static defaultProps = {
    onClick: null,
    path: null,
  }

  render() {
    const {
      onClick,
      path,
      icon,
      label,
    }: Props = this.props

    const content = (
      <Fragment>
        <span className='icon'>
          <JIcon
            name={icon}
            color='white'
          />
        </span>
        <span className='text'>
          <JText
            value={label}
            size='normal'
            color='white'
            weight='bold'
          />
        </span>
      </Fragment>
    )

    if (onClick) {
      return <div onClick={onClick} className='menu-panel-actions-item'>{content}</div>
    }

    if (path) {
      return (
        <JLink
          href={path}
          className='menu-panel-actions-item'
        >
          {content}
        </JLink>
      )
    }

    return null
  }
}

export default MenuPanelActionsItem
