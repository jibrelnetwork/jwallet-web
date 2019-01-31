// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import {
  JIcon,
  JTabs,
  JSearch,
} from 'components/base'

import {
  DigitalAssetsGrid,
  DigitalAssetsFilter,
} from 'components'

const DIGITAL_ASSETS_TABS = {
  '/digital-assets': 'Digital assets',
  '/transactions': 'Transactions',
}

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +addAssetClick: () => void,
  +sortByNameClick: () => void,
  +sortByBalanceClick: () => void,
  +setSearchQuery: (string) => void,
  +manageAssetsOpenClick: () => void,
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
      addAssetClick,
      setSearchQuery,
      sortByNameClick,
      sortByBalanceClick,
      setHideZeroBalance,
      manageAssetsOpenClick,
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
                  placeholder='Search assets...'
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
              <div
                className='setting'
                onClick={manageAssetsOpenClick}
                title='Assets manager'
              >
                <JIcon
                  size='medium'
                  color='gray'
                  name='setting-grid'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='content'>
          <Scrollbars autoHide>
            <DigitalAssetsGrid
              items={items}
              addAssetClick={addAssetClick}
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsGridView
