// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { t } from 'ttag'

import {
  JIcon, JTabs, JSearch, JLink,
} from 'components/base'

import {
  DigitalAssetsGrid,
  DigitalAssetsFilter,
} from 'components'

import homeStyle from './home.m.scss'

// eslint-disable-next-line max-len
const JCASH_UTM_URL = 'https://jcash.network?utm_source=jwallet&utm_medium=internal_link&utm_campaign=jibrel_projects_promo&utm_content=home_exchange'
const DIGITAL_ASSETS_TABS = {
  '/': t`Digital Assets`,
  '/history': t`Transactions`,
}

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +sortByNameClick: () => void,
  +sortByBalanceClick: () => void,
  +setSearchQuery: (string) => void,
  +setHideZeroBalance: (boolean) => void,
  +items: DigitalAssetWithBalance[],
  +filterOptions: DigitalAssetsFilterOptions,
|}

export class HomeTemplate extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      setSearchQuery,
      sortByNameClick,
      sortByBalanceClick,
      setHideZeroBalance,
      items,
      filterOptions,
    } = this.props

    const filterCount: number = filterOptions.isHideZeroBalance ? 1 : 0

    return (
      <div className={homeStyle.core}>
        <section>
          <h2 className={homeStyle.title}>
            {t`Transfer`}
          </h2>
          <nav className={homeStyle.transferButtons}>
            <JLink
              className={homeStyle.transferButton}
              href='/send'
            >
              <div className={homeStyle.transferButtonIcon}>
                <JIcon
                  name='home-send-use-fill'
                  color='blue'
                />
              </div>
              {t`Send`}
            </JLink>
            <JLink
              className={homeStyle.transferButton}
              href='/receive'
            >
              <div className={homeStyle.transferButtonIcon}>
                <JIcon
                  name='home-receive-use-fill'
                  color='blue'
                />
              </div>
              {t`Receive`}
            </JLink>
            <JLink
              className={homeStyle.transferButton}
              href={JCASH_UTM_URL}
            >
              <div className={homeStyle.transferButtonIcon}>
                <JIcon
                  name='home-exchange-use-fill'
                  color='blue'
                />
              </div>
              {t`Exchange`}
            </JLink>
          </nav>
        </section>
        <div className={homeStyle.header}>
          <div className={homeStyle.container}>
            <JTabs tabs={DIGITAL_ASSETS_TABS} />
            <div className={homeStyle.actions}>
              <div className={homeStyle.search}>
                <JSearch
                  onChange={setSearchQuery}
                  placeholder={t`Search assets...`}
                />
              </div>
              <div className={homeStyle.filter}>
                <DigitalAssetsFilter
                  {...filterOptions}
                  filterCount={filterCount}
                  sortByNameClick={sortByNameClick}
                  sortByBalanceClick={sortByBalanceClick}
                  setHideZeroBalance={setHideZeroBalance}
                />
              </div>
              <JLink
                className={homeStyle.setting}
                href='/assets'
                title={t`Assets manager`}
              >
                <JIcon
                  color='gray'
                  name='setting-grid'
                />
              </JLink>
            </div>
          </div>
        </div>
        <div className={homeStyle.content}>
          <Scrollbars autoHide>
            <DigitalAssetsGrid
              items={items}
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}
