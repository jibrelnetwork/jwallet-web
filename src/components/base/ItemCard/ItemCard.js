// @flow

import React from 'react'
import classNames from 'classnames'

import { JLink } from 'components/base'

import style from './itemCard.m.scss'

type Props = {|
  +children: React$Node,
  +href: string,
  +isActive?: boolean,
  +onClick?: (SyntheticEvent<EventTarget>) => mixed,
  +className?: string,
|}

function handleClick(onClick: SyntheticEvent<EventTarget> => mixed) {
  return (event: SyntheticEvent<EventTarget>) => {
    event.preventDefault()

    onClick(event)
  }
}

function Component({
  className,
  onClick,
  href,
  isActive,
  children,
}: Props) {
  return (
    <JLink
      onClick={onClick ? handleClick(onClick) : undefined}
      className={classNames(
        style.core,
        isActive && style.selected,
        className,
      )}
      href={href}
    >
      {children}
    </JLink>
  )
}

Component.defaultProps = {
  isActive: false,
  onClick: undefined,
  className: undefined,
}

export const ItemCard = React.memo<Props>(Component)
