// @flow

import React from 'react'
import { Link } from 'react-router'
import { Scrollbars } from 'react-custom-scrollbars'

import { JIcon, JText } from 'components/base'

import AssetItem from './AssetItem'
import CurrentAddress from './CurrentAddress'

const ActiveAssetsPanel = ({
  setCurrent,
  digitalAssets,
  isLoading,
  currentAssetAddress,
  currentWalletAddress,
}: Props) => (
  <div className='active-assets-panel'>
    <div className='address'>
      <CurrentAddress address={currentWalletAddress} />
    </div>
    <div className='list'>
      <Scrollbars autoHide>
        {digitalAssets.map((data, index) => (
          <AssetItem
            {...data}
            key={index}
            setCurrent={setCurrent}
            isLoading={isLoading}
            isCurrent={currentAssetAddress === data.address}
          />
        ))}
      </Scrollbars>
    </div>
    <div className='manage'>
      <Link to='/digital-assets' className='link'>
        <div className='icon'>
          <JIcon size='small' name='plus' color='blue' />
        </div>
        <JText value='assetsPanel.button' variants={['bold', 'blue']} />
      </Link>
    </div>
  </div>
)

type Props = {
  setCurrent: Function,
  digitalAssets: DigitalAssets,
  isLoading: boolean,
  currentAssetAddress: ?Address,
  currentWalletAddress: ?Address,
}

export default ActiveAssetsPanel
