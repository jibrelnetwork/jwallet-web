// @flow strict

import React from 'react'
import { t } from 'ttag'

import classNames from 'classnames'

import tabsStyle from './tabs.m.scss'

export type Tab = 'contacts' | 'wallets'
export type TabClickHandler = (tabName: Tab) => any

type Props = {|
  activeTab: Tab,
  onTabClick: TabClickHandler,
|}

const handleTabBarClick = (e: SyntheticEvent<HTMLDivElement>) => {
  e.stopPropagation()
}

const handleTabClick = (onTabClick: TabClickHandler, tabName: Tab) => (e) => {
  e.stopPropagation()

  onTabClick(tabName)
}

export function Tabs({
  activeTab,
  onTabClick,
}: Props) {
  return (
    <div className={tabsStyle.core} onClick={handleTabBarClick}>
      <button
        type='button'
        onClick={handleTabClick(onTabClick, 'contacts')}
        className={classNames(
          tabsStyle.button,
          tabsStyle.wallets,
          activeTab === 'contacts' && tabsStyle.active,
        )}
      >
        {t`Contacts`}
      </button>
      <button
        type='button'
        onClick={handleTabClick(onTabClick, 'wallets')}
        className={classNames(
          tabsStyle.button,
          tabsStyle.wallets,
          activeTab === 'wallets' && tabsStyle.active,
        )}
      >
        {t`My Wallets`}
      </button>
    </div>
  )
}

Tabs.defaultProps = {
  activeTab: 'contacts',
}
