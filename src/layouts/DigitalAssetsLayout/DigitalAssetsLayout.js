// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import ActiveAssetsLayout from 'layouts/ActiveAssetsLayout'
import JTabs from 'components/base/__new__/JTabs'
import DigitalAssetsActions from 'routes/DigitalAssets/containers/DigitalAssetsActionsContainer'

const DIGITAL_ASSETS_TABS = {
  '/digital-assets/with-balance': 'My Digital Assets',
  '/digital-assets/popular': 'Popular Assets',
}

const DigitalAssetsLayout = ({ children }: Props) => (
  <ActiveAssetsLayout>
    <div className='header'>
      <JTabs tabs={DIGITAL_ASSETS_TABS} />
      <DigitalAssetsActions />
    </div>
    <div className='wrapper'>
      <Scrollbars autoHide>
        {children}
      </Scrollbars>
    </div>
  </ActiveAssetsLayout>
)

type Props = {
  children?: Object,
}

DigitalAssetsLayout.defaultProps = {
  children: null,
}

export default DigitalAssetsLayout
