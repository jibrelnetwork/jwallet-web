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

import style from './home.m.scss'

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

class HomeTemplate extends Component<Props> {
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
      <div className={style.home}>
        <section>
          <h2 className={style.title}>
            {t`Transfer`}
          </h2>
          <nav className={style.transferButtons}>
            <JLink
              className={style.transferButton}
              href='/send'
            >
              <div className={style.transferButtonIcon}>
                <JIcon
                  name='home-send-use-fill'
                  color='blue'
                />
              </div>
              {t`Send`}
            </JLink>
            <JLink
              className={style.transferButton}
              href='/receive'
            >
              <div className={style.transferButtonIcon}>
                <JIcon
                  name='home-receive-use-fill'
                  color='blue'
                />
              </div>
              {t`Receive`}
            </JLink>
            <JLink
              className={style.transferButton}
              href={JCASH_UTM_URL}
            >
              <div className={style.transferButtonIcon}>
                <JIcon
                  name='home-exchange-use-fill'
                  color='blue'
                />
              </div>
              {t`Exchange`}
            </JLink>
          </nav>
        </section>
        <div className={style.header}>
          <div className={style.container}>
            <JTabs tabs={DIGITAL_ASSETS_TABS} />
            <div className={style.actions}>
              <div className={style.search}>
                <JSearch
                  onChange={setSearchQuery}
                  placeholder={t`Search assets...`}
                />
              </div>
              <div className={style.filter}>
                <DigitalAssetsFilter
                  {...filterOptions}
                  filterCount={filterCount}
                  sortByNameClick={sortByNameClick}
                  sortByBalanceClick={sortByBalanceClick}
                  setHideZeroBalance={setHideZeroBalance}
                />
              </div>
              <JLink
                className={style.setting}
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
        <div className={style.content}>
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

export default HomeTemplate
