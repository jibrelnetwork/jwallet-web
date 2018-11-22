// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { JSearch, JTabs, JIcon } from 'components/base'

import {
  DigitalAssetsGrid,
  DigitalAssetsFilter,
} from 'components'

const DIGITAL_ASSETS_TABS = {
  '/digital-assets': 'Digital assets',
  '/': 'Transactions',
}

type Props = {|
  openView: () => void,
  closeView: () => void,
  setSearchQuery: (string) => void,
  sortByNameClick: () => void,
  sortByBalanceClick: () => void,
  setHideZeroBalance: (boolean) => void,
  addAssetClick: () => void,
  manageAssetsOpenClick: () => void,
  items: Array<DigitalAssetsGridItemType>,
  filter: DigitalAssetsFilterType,
  filterCount: number,
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
      items,
      setSearchQuery,
      filter,
      sortByNameClick,
      sortByBalanceClick,
      setHideZeroBalance,
      filterCount,
      addAssetClick,
      manageAssetsOpenClick,
    } = this.props

    return (
      <div className='digital-assets-grid-view'>
        <div className='header'>
          <div className='container'>
            <JTabs tabs={DIGITAL_ASSETS_TABS} />
            <div className='actions'>
              <div className='search'>
                <JSearch
                  onQueryChange={setSearchQuery}
                  placeholder='Search asset...'
                />
              </div>
              <div className='filter'>
                <DigitalAssetsFilter
                  {...filter}
                  filterCount={filterCount}
                  sortByNameClick={sortByNameClick}
                  sortByBalanceClick={sortByBalanceClick}
                  setHideZeroBalance={setHideZeroBalance}
                />
              </div>
              <div className='setting' onClick={manageAssetsOpenClick}>
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
