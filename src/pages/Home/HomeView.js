// @flow

import React, { Component } from 'react'
import { t } from 'ttag'
import { get } from 'lodash-es'

import {
  JIcon, JSearch, JLink, Header,
} from 'components/base'

import { AssetItem } from './components/AssetItem/AssetItem'

import homeStyle from './home.m.scss'

// eslint-disable-next-line max-len
const JCASH_UTM_URL = 'https://jcash.network?utm_source=jwallet&utm_medium=internal_link&utm_campaign=jibrel_projects_promo&utm_content=home_exchange'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +setSearchQuery: (string) => void,
  +items: DigitalAssetWithBalance[],
|}

export class HomeView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      setSearchQuery,
      items,
    } = this.props

    return (
      <div className={homeStyle.core}>
        <section>
          <Header title={t`Transfer`} />
          <nav className={homeStyle.links}>
            <JLink
              className={homeStyle.link}
              href='/send'
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-send-use-fill'
                  color='blue'
                />
              </div>
              {t`Send`}
            </JLink>
            <JLink
              className={homeStyle.link}
              href='/receive'
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-receive-use-fill'
                  color='blue'
                />
              </div>
              {t`Receive`}
            </JLink>
            <JLink
              className={homeStyle.link}
              href={JCASH_UTM_URL}
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-exchange-use-fill'
                  color='blue'
                />
              </div>
              {t`Exchange`}
            </JLink>
          </nav>
        </section>
        <section>
          <Header title={t`Assets`}>
            <div className={homeStyle.search}>
              <JSearch
                onChange={setSearchQuery}
                placeholder={t`Search assets...`}
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
          </Header>
          <div className={homeStyle.content}>
            {items.map((item) => {
              const address = get(item, 'blockchainParams.address')

              return (
                <AssetItem
                  key={address}
                  address={address}
                />
              )
            })}
          </div>
        </section>
      </div>
    )
  }
}
