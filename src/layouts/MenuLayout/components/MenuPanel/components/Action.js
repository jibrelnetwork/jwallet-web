// @flow strict

import React from 'react'

import {
  JIcon,
  JLink,
} from 'components/base'

import menuPanelStyle from '../menuPanel.m.scss'

type Props = {|
  +href: string,
  +label: string,
  +iconName: string,
|}

export function Action({
  href,
  label,
  iconName,
}: Props) {
  return (
    <JLink
      href={href}
      className={menuPanelStyle.action}
      activeClassName={menuPanelStyle.active}
    >
      <JIcon name={`${iconName}-use-fill`} />
      <span className={menuPanelStyle.label}>
        {label}
      </span>
    </JLink>
  )
}
