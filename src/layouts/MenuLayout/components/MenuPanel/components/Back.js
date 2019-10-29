// @flow strict

import React from 'react'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from '../menuPanel.m.scss'

type Props = {|
  +previousRoute: ?string,
  +isMinimized: boolean,
|}

const ICONS = {
  '/': 'home',
  '/more': 'more',
  '/wallets': 'wallet',
  '/history': 'history',
  '/contacts': 'contact',
  '/settings': 'settings',
}

export function Back({
  previousRoute,
  isMinimized,
}: Props) {
  if (!isMinimized || !previousRoute) {
    return null
  }

  return (
    <JLink
      href={previousRoute}
      className={`__breadcrumbs ${styles.breadcrumbs}`}
    >
      <JIcon
        className={styles.back}
        name='arrow-back-use-fill'
      />
      <JIcon
        className={styles.routeIcon}
        name={`${ICONS[previousRoute]}-use-fill`}
      />
    </JLink>
  )
}
