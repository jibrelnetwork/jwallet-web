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

const DIGITAL_ASSETS_TABS = {
  '/digital-assets': t`Digital Assets`,
  '/transactions': t`Transactions`,
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

class DigitalAssetsGridView extends Component<Props> {
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
      <div className='digital-assets-grid-view'>
        <div className='header'>
          <div className='container'>
            <JTabs tabs={DIGITAL_ASSETS_TABS} />
            <div className='actions'>
              <div className='search'>
                <JSearch
                  onChange={setSearchQuery}
                  placeholder={t`Search assets...`}
                />
              </div>
              <div className='filter'>
                <DigitalAssetsFilter
                  {...filterOptions}
                  filterCount={filterCount}
                  sortByNameClick={sortByNameClick}
                  sortByBalanceClick={sortByBalanceClick}
                  setHideZeroBalance={setHideZeroBalance}
                />
              </div>
              <JLink
                className='setting'
                href='/digital-assets/manage'
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
        <div className='content'>
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

export default DigitalAssetsGridView
