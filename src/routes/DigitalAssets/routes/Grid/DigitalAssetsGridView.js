// @flow

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { JSearch, JTabs } from 'components/base'

import { DigitalAssetsGrid } from 'components'

const DIGITAL_ASSETS_TABS = {
  '/digital-assets': 'Digital assets',
  '/custom-asset/add': 'Transactions',
}

type Props = {
  openView: () => void,
  closeView: () => void,
  setSearchQuery: (string) => void,
  items: DigitalAssets,
  balances: DigitalAssetBalances,
  searchQuery: string,
}

class DigitalAssetsView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
    console.log('MOUNT: DigitalAssetsLayout')
  }

  componentWillUnmount() {
    this.props.closeView()
    console.log('UNMOUNT: DigitalAssetsLayout')
  }

  render() {
    const {
      items,
      balances,
      searchQuery,
      setSearchQuery,
    } = this.props

    return (
      <div className='digital-assets-grid-view'>
        <div className='header'>
          <JTabs tabs={DIGITAL_ASSETS_TABS} />
          <div className='search'>
            <JSearch
              onChange={setSearchQuery}
              value={searchQuery}
              placeholder='Search...'
            />
          </div>
        </div>
        <div className='content'>
          <Scrollbars autoHide>
            <DigitalAssetsGrid
              items={items}
              balances={balances}
            />
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsView
