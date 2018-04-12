// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import ActiveAssetsLayout from 'layouts/ActiveAssetsLayout'
import { JButton, JSearch, JTabs } from 'components/base'

const DIGITAL_ASSETS_TABS = {
  '/digital-assets/balance': 'My Digital Assets',
  '/digital-assets/popular': 'Popular Assets',
  '/digital-assets/custom': 'Custom Assets',
}

const DigitalAssetsLayout = ({ goToCustomAssetAdd, search, searchQuery, children }: Props) => (
  <ActiveAssetsLayout>
    <div className='digital-assets-layout'>
      <div className='header'>
        <JTabs tabs={DIGITAL_ASSETS_TABS} />
        <div className='actions'>
          <JButton
            onClick={goToCustomAssetAdd}
            color='blue'
            iconName='plus'
            iconSize='small'
            text='header.actions.addCustomAsset'
            minimal
          />
          <div className='search'>
            <JSearch
              onChange={search}
              value={searchQuery}
              placeholder='search...'
            />
          </div>
        </div>
      </div>
      <div className='content'>
        <Scrollbars autoHide>
          {children}
        </Scrollbars>
      </div>
    </div>
  </ActiveAssetsLayout>
)

type Props = {
  search: Function,
  goToCustomAssetAdd: Function,
  searchQuery: string,
  children: ?Object,
}

DigitalAssetsLayout.defaultProps = {
  search: () => {},
  goToCustomAssetAdd: () => {},
  searchQuery: '',
  children: null,
}

export default DigitalAssetsLayout
