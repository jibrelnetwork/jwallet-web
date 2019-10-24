// @flow

import React from 'react'
import classNames from 'classnames'

import headerStyle from './header.m.scss'

type Props = {|
  +title: string,
  className?: ?string,
  children?: React$Node,
|}

export function Header({
  title,
  className,
  children,
}: Props) {
  return (
    <div
      className={classNames(
        '__header',
        headerStyle.core,
        className,
      )}
    >
      <h1 className={headerStyle.title}>{title}</h1>
      <aside className={headerStyle.aside}>
        {children}
      </aside>
    </div>
  )
}

Header.defaultProps = {
  className: null,
  children: null,
}
