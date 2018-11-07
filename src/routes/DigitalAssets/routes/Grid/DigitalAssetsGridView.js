// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { JSearch, JTabs, JIcon } from 'components/base'

import {
  DigitalAssetsGrid,
  DigitalAssetsFilter,
  type DigitalAssetsGridItemType,
} from 'components'

const DIGITAL_ASSETS_TABS = {
  '/digital-assets': 'Digital assets',
  '/custom-asset/add': 'Transactions',
}

type Props = {
  openView: () => void,
  closeView: () => void,
  setSearchQuery: (string) => void,
  sortByNameClick: () => void,
  sortByBalanceClick: () => void,
  setMyAssetsFirst: (boolean) => void,
  setHideZeroBalance: (boolean) => void,
  items: Array<DigitalAssetsGridItemType>,
  filter: DigitalAssetsFilter
}

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
      setMyAssetsFirst,
      setHideZeroBalance,
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
                  onClickSortByName={sortByNameClick}
                  onClickSortByBalance={sortByBalanceClick}
                  onChangeMyAssetsFirst={setMyAssetsFirst}
                  onChangeHideZeroBalance={setHideZeroBalance}
                />
              </div>
              <div className='setting'>
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
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsGridView
