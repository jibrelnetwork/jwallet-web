// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import JFlatButton from 'components/base/JFlatButton'

import AssetItem from './AssetItem'
import CurrentAddress from './CurrentAddress'

const ActiveAssetsPanel = ({
  hover,
  setCurrent,
  goToWallets,
  goToDigitalAssets,
  digitalAssets,
  hoveredAsset,
  currentAssetAddress,
  currentWalletAddress,
  isLoading,
}: Props) => (
  <div className='active-assets-panel'>
    <div className='address'>
      <CurrentAddress goToWallets={goToWallets} address={currentWalletAddress} />
    </div>
    <div className='list'>
      <Scrollbars autoHide>
        {digitalAssets.map((data, index) => (
          <AssetItem
            {...data}
            key={index}
            hover={hover}
            setCurrent={setCurrent}
            isHovered={hoveredAsset === data.address}
            isCurrent={currentAssetAddress === data.address}
            isLoading={isLoading}
          />
        ))}
      </Scrollbars>
    </div>
    <div className='manage'>
      <JFlatButton
        onClick={goToDigitalAssets}
        color='blue'
        iconName='plus'
        text='assetsPanel.button'
      />
    </div>
  </div>
)

type Props = {
  hover: Function,
  setCurrent: Function,
  goToWallets: Function,
  goToDigitalAssets: Function,
  digitalAssets: DigitalAssets,
  hoveredAsset: ?Address,
  currentAssetAddress: ?Address,
  currentWalletAddress: ?Address,
  isLoading: boolean,
}

ActiveAssetsPanel.defaultProps = {
  hover: () => {},
  setCurrent: () => {},
  goToWallets: () => {},
  goToDigitalAssets: () => {},
  digitalAssets: [],
  hoveredAsset: null,
  currentAssetAddress: null,
  currentWalletAddress: null,
  isLoading: false,
}

export default ActiveAssetsPanel
