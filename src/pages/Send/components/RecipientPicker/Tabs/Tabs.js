// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'

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
  const i18n = useI18n()

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
        {i18n._(
          'Send.RecipientPicker.contacts',
          null,
          { defaults: 'Contacts' },
        )}
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
        {i18n._(
          'Send.RecipientPicker.wallets',
          null,
          { defaults: 'My Wallets' },
        )}
      </button>
    </div>
  )
}

Tabs.defaultProps = {
  activeTab: 'contacts',
}
