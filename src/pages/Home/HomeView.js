// @flow

import React, { Component } from 'react'
import classNames from 'classnames'
import { t } from 'ttag'
import {
  get,
  isEqual,
} from 'lodash-es'

import {
  JIcon, SearchInput, JLink, Header,
} from 'components/base'

import { AssetItem } from './components/AssetItem/AssetItem'
import { filterAssetByQuery } from './filterAssetByQuery'

import homeStyle from './home.m.scss'

// eslint-disable-next-line max-len
const JCASH_UTM_URL = 'https://jcash.network?utm_source=jwallet&utm_medium=internal_link&utm_campaign=jibrel_projects_promo&utm_content=home_exchange'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +items: DigitalAssetWithBalance[],
|}

type ComponentState = {
  searchQuery: string,
  isInManageMode: boolean,
}

export class HomeView extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      searchQuery: '',
      isInManageMode: false,
    }
  }

  componentDidMount() {
    this.props.openView()
  }

  shouldComponentUpdate(nextProps: Props, nextState: ComponentState) {
    if (
      nextProps.items
        .find(
          (item, idx) => get(
            item,
            'blockchainParams.address',
          ) !== get(
            this.props.items[idx],
            'blockchainParams.address',
          ),
        )
    ) {
      return true
    }

    return isEqual(this.state, nextState)
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  handleSearchQueryInput = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  handleClickManage = () => {
    this.setState(({
      isInManageMode,
    }) => ({
      isInManageMode: !isInManageMode,
    }))
  }

  renderAssetsList = filteredItems => (
    <ul>
      {filteredItems.map((item) => {
        const address = get(item, 'blockchainParams.address')

        return (
          <li key={address}>
            <AssetItem address={address} />
          </li>
        )
      })}
    </ul>
  )

  renderEmptyList = () => (
    <figure>
      <JIcon name='pic_assets_112-use-fill' className={homeStyle.emptyIcon} />
      <figcaption>{t`No Search Results.`}</figcaption>
    </figure>
  )

  render() {
    const {
      items,
    } = this.props
    const {
      isInManageMode,
    } = this.state

    const filteredItems = items.filter(item => filterAssetByQuery(
      item,
      this.state.searchQuery,
    ))
    const isEmptyAssetsList = filteredItems.length <= 0

    return (
      <div className={homeStyle.core}>
        <section className={homeStyle.linksSection}>
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
        <section
          className={classNames(
            homeStyle.assetsSection,
            isEmptyAssetsList && homeStyle.empty,
          )}
        >
          <Header title={t`Assets`}>
            <div className={homeStyle.search}>
              <SearchInput
                onChange={this.handleSearchQueryInput}
              />
            </div>
            {isInManageMode
              ? (
                <button
                  className={`__save-button ${homeStyle.save}`}
                  type='button'
                  onClick={this.handleClickManage}
                >
                  {t`Save`}
                </button>
              )
              : (
                <button
                  className={`__manage-button ${homeStyle.manage}`}
                  type='button'
                  onClick={this.handleClickManage}
                >
                  <JIcon
                    name='ic_manage_24-use-fill'
                    className={`__manage-button ${homeStyle.manageIcon}`}
                  />
                  {t`Manage`}
                </button>
              )
            }
          </Header>
          <div className={homeStyle.content}>
            {isEmptyAssetsList
              ? this.renderEmptyList()
              : this.renderAssetsList(filteredItems)
            }
          </div>
        </section>
      </div>
    )
  }
}
