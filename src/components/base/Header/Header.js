// @flow strict

import React from 'react'
import classNames from 'classnames'

import styles from './header.m.scss'

type Props = {|
  +title: string,
  +className: ?string,
  +children: React$Node,
|}

export default function Header({
  title,
  className,
  children,
}: Props) {
  return (
    <div
      className={classNames(
        '__header',
        styles.core,
        className,
      )}
    >
      <h1 className={styles.title}>{title}</h1>
      <aside className={styles.aside}>
        {children}
      </aside>
    </div>
  )
}

Header.defaultProps = {
  children: null,
  className: null,
}
