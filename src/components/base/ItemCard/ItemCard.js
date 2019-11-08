// @flow strict

import React from 'react'
import classNames from 'classnames'

import JLink from 'components/base/JLink'

import styles from './itemCard.m.scss'

type Props = {|
  +onClick?: (SyntheticEvent<EventTarget>) => any,
  +children: React$Node,
  +href: string,
  +className?: string,
  +isActive?: boolean,
|}

function handleClick(onClick: SyntheticEvent<EventTarget> => mixed) {
  return (event: SyntheticEvent<EventTarget>) => {
    event.preventDefault()

    onClick(event)
  }
}

export default function ItemCard({
  onClick,
  children,
  href,
  className,
  isActive,
}: Props) {
  return (
    <JLink
      onClick={onClick ? handleClick(onClick) : undefined}
      className={classNames(
        styles.core,
        isActive && styles.selected,
        className,
      )}
      href={href}
    >
      {children}
    </JLink>
  )
}

ItemCard.defaultProps = {
  isActive: false,
  onClick: undefined,
  className: undefined,
}

export const ItemCardEnhanced = React.memo<Props>(ItemCard)
