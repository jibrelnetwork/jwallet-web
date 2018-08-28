// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import AssetItem from './AssetItem'
import ManageAssets from './ManageAssets'
import CurrentAddress from './CurrentAddress'

const ActiveAssetsPanel = ({
  hover,
  setCurrent,
  goToWallets,
  setManageHovered,
  goToDigitalAssets,
  digitalAssets,
  hoveredAsset,
  currentAssetAddress,
  currentWalletAddress,
  isLoading,
  isManageHovered,
  isWalletReadOnly,
}: Props) => (
  <div className='active-assets-panel'>
    <CurrentAddress
      goToWallets={goToWallets}
      address={currentWalletAddress}
      isReadOnly={isWalletReadOnly}
    />
    <div className='list'>
      <Scrollbars autoHide>
        {digitalAssets.map(data => (
          <AssetItem
            {...data}
            key={data.address}
            hover={hover}
            setCurrent={setCurrent}
            isHovered={hoveredAsset === data.address}
            isCurrent={currentAssetAddress === data.address}
            isLoading={isLoading}
          />
        ))}
      </Scrollbars>
    </div>
    <ManageAssets
      setHovered={setManageHovered}
      goToDigitalAssets={goToDigitalAssets}
      isHovered={isManageHovered}
    />
  </div>
)

type Props = {
  hover: Function,
  setCurrent: Function,
  goToWallets: Function,
  setManageHovered: Function,
  goToDigitalAssets: Function,
  digitalAssets: Array<DigitalAssetMainDataWithBalance>,
  hoveredAsset: ?Address,
  currentAssetAddress: ?Address,
  currentWalletAddress: ?Address,
  isLoading: boolean,
  isManageHovered: boolean,
  isWalletReadOnly: boolean,
}

export default ActiveAssetsPanel
