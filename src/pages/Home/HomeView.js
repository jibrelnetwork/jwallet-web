// @flow

import React, { Component } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  get,
  isEqual,
} from 'lodash-es'

import noResultImg from 'public/assets/pic_assets_112.svg'
import buttonStyles from 'components/base/Button/button.m.scss'
import { SearchInput } from 'components'
import { searchAssets } from 'utils/search'

import {
  JIcon,
  JLink,
  Header,
  Button,
} from 'components/base'

import { AssetItem } from './components/AssetItem/AssetItem'
import { ManageAssetItem } from './components/AssetItem/ManageAssetItem'

import styles from './home.m.scss'

// eslint-disable-next-line max-len
const JCASH_UTM_URL = 'https://jcash.network?utm_source=jwallet&utm_medium=internal_link&utm_campaign=jibrel_projects_promo&utm_content=home_exchange'
const ASSETS_HEADER_BOTTOM_EDGE = 376

export type Props = {|
  +setAssetIsActive: (assetAddress: string, isActive: boolean) => any,
  +items: DigitalAssetWithBalance[],
  +i18n: I18nType,
|}

type StateProps = {|
  +searchQuery: string,
  +isInManageMode: boolean,
  +assetsState: {
    [assetAddress: string]: boolean,
  },
  +isSticky: boolean,
|}

type AssetState = {|
  +address: AssetAddress,
  isActive: boolean,
|}

function filterActiveDigitalAssets(items: DigitalAssetWithBalance[]): DigitalAssetWithBalance[] {
  return items.filter(({ isActive }: DigitalAssetWithBalance) => !!isActive)
}

class HomeViewComponent extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      searchQuery: '',
      isInManageMode: false,
      assetsState: {},
      isSticky: false,
    }
  }

  componentDidMount() {
    this.rootWrapper.addEventListener('scroll', this.handleScroll)
  }

  shouldComponentUpdate(nextProps: Props, nextState: StateProps) {
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

    return !isEqual(this.state, nextState)
  }

  componentWillUnmount() {
    this.rootWrapper.removeEventListener('scroll', this.handleScroll)
  }

  rootWrapper = window.root || document.getElementById('root')

  handleSearchQueryInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault()

    this.setState({ searchQuery: e.target.value })
  }

  handleScroll = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    const { isSticky } = this.state
    const { scrollTop } = this.rootWrapper

    if (!isSticky && scrollTop >= ASSETS_HEADER_BOTTOM_EDGE) {
      this.setState({ isSticky: true })
    }

    if (isSticky && scrollTop < ASSETS_HEADER_BOTTOM_EDGE) {
      this.setState({ isSticky: false })
    }
  }

  handleEnterManageMode = () => {
    const assetsState = this.props.items.reduce((reduceResult, item) => {
      reduceResult[item.blockchainParams.address] = Boolean(item.isActive)

      return reduceResult
    }, {})

    this.setState({
      assetsState,
      isInManageMode: true,
    })
  }

  handleLeaveManageMode = () => {
    const { assetsState }: StateProps = this.state

    const {
      items,
      setAssetIsActive,
    }: Props = this.props

    const diff: AssetState[] = items
      .map((item: DigitalAssetWithBalance): ?AssetState =>
        (Boolean(item.isActive) === assetsState[item.blockchainParams.address]) ? null : {
          isActive: assetsState[item.blockchainParams.address],
          address: item.blockchainParams.address,
        })
      .filter(Boolean)

    diff.forEach(({
      address,
      isActive,
    }: AssetState) => setAssetIsActive(
      address,
      isActive,
    ))

    this.setState({
      searchQuery: '',
      isInManageMode: false,
    })
  }

  handleManageAssetCheck = (address: string, isChecked: boolean) => {
    this.setState({
      assetsState: {
        ...this.state.assetsState,
        [address]: isChecked,
      },
    })
  }

  renderAssetsList = (filteredItems: DigitalAssetWithBalance[]) => {
    const {
      isInManageMode,
      assetsState,
    } = this.state

    return (
      <ul className={styles.assetList}>
        {filteredItems.map((item) => {
          const address = get(item, 'blockchainParams.address')

          return (
            <li key={address}>
              {isInManageMode
                ? (
                  <ManageAssetItem
                    address={address}
                    isChecked={assetsState[address] || false}
                    onCheck={this.handleManageAssetCheck}
                  />
                ) : (
                  <AssetItem address={address} />
                )}
            </li>
          )
        })}
      </ul>
    )
  }

  renderEmptyList = () => {
    const { i18n } = this.props

    return (
      <figure>
        <img
          src={noResultImg}
          className={styles.emptyIcon}
          alt={i18n._(
            'Home.noSearchResults.alt',
            null,
            { defaults: 'No search results in assets list' },
          )}
        />
        <figcaption>{i18n._(
          'Home.noSearchResults.description',
          null,
          { defaults: 'No Search Results.' },
        )}
        </figcaption>
      </figure>
    )
  }

  render() {
    const {
      items,
      i18n,
    }: Props = this.props

    const {
      searchQuery,
      isInManageMode,
      isSticky,
    }: StateProps = this.state

    const filteredItems: DigitalAssetWithBalance[] = searchAssets(
      isInManageMode ? items : filterActiveDigitalAssets(items),
      searchQuery,
    )

    const isEmptyAssetsList: boolean = !filteredItems.length

    return (
      <div className={styles.core}>
        <section className={styles.linksSection}>
          <Header title={i18n._(
            'Home.transfer.title',
            null,
            { defaults: 'Transfer' },
          )}
          />
          <nav className={styles.links}>
            <JLink
              className={styles.link}
              href='/send'
            >
              <div className={styles.linkIcon}>
                <JIcon
                  name='home-send-use-fill'
                  color='blue'
                />
              </div>
              {i18n._(
                'Home.transfer.send',
                null,
                { defaults: 'Send' },
              )}
            </JLink>
            <JLink
              className={styles.link}
              href='/receive'
            >
              <div className={styles.linkIcon}>
                <JIcon
                  name='home-receive-use-fill'
                  color='blue'
                />
              </div>
              {i18n._(
                'Home.transfer.receive',
                null,
                { defaults: 'Receive' },
              )}
            </JLink>
            <JLink
              className={styles.link}
              href={JCASH_UTM_URL}
            >
              <div className={styles.linkIcon}>
                <JIcon
                  name='home-exchange-use-fill'
                  color='blue'
                />
              </div>
              {i18n._(
                'Home.transfer.exchange',
                null,
                { defaults: 'Exchange' },
              )}
            </JLink>
          </nav>
        </section>
        <section
          className={classNames(
            styles.assetsSection,
            isEmptyAssetsList && styles.empty,
          )}
        >
          <div
            className={classNames(
              styles.assetsHeaderWrapper,
              isSticky && styles.sticky,
            )}
          >
            <Header
              title={isInManageMode ? i18n._(
                'Home.assets.title.manage',
                null,
                { defaults: 'Manage Assets' },
              ) : i18n._(
                'Home.assets.title.default',
                null,
                { defaults: 'Assets' },
              )}
              className={styles.assetsHeader}
            >
              <div className={styles.search}>
                <SearchInput
                  onChange={this.handleSearchQueryInput}
                  value={searchQuery}
                />
              </div>
              {isInManageMode ? (
                <>
                  <JLink
                    className={styles.add}
                    href='/assets/add'
                    theme='button-additional-icon'
                  >
                    <JIcon
                      className={buttonStyles.icon}
                      name='ic_add_24-use-fill'
                    />
                    <span className={buttonStyles.label}>
                      {i18n._(
                        'Home.assets.add',
                        null,
                        { defaults: 'Add Asset' },
                      )}
                    </span>
                  </JLink>
                  <Button
                    onClick={this.handleLeaveManageMode}
                    className={styles.save}
                    theme='additional'
                  >
                    {i18n._(
                      'Home.assets.save',
                      null,
                      { defaults: 'Save' },
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  className='__manage-button'
                  theme='additional-icon'
                  onClick={this.handleEnterManageMode}
                >
                  <JIcon
                    name='ic_manage_24-use-fill'
                    className={buttonStyles.icon}
                  />
                  <span className={buttonStyles.label}>
                    {i18n._(
                      'Home.assets.manage',
                      null,
                      { defaults: 'Manage' },
                    )}
                  </span>
                </Button>
              )}
            </Header>
          </div>
          <div className={styles.content}>
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

export const HomeView = withI18n()(
  HomeViewComponent,
)
