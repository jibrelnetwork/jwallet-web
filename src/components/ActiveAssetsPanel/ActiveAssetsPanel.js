// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import JFlatButton from 'components/base/JFlatButton'

import AssetItem from './AssetItem'
import CurrentAddress from './CurrentAddress'

const ActiveAssetsPanel = ({
  setCurrent,
  goToWallets,
  goToDigitalAssets,
  digitalAssets,
  isLoading,
  currentAssetAddress,
  currentWalletAddress,
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
            setCurrent={setCurrent}
            isLoading={isLoading}
            isCurrent={currentAssetAddress === data.address}
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
  setCurrent: Function,
  goToWallets: Function,
  goToDigitalAssets: Function,
  digitalAssets: DigitalAssets,
  isLoading: boolean,
  currentAssetAddress: ?Address,
  currentWalletAddress: ?Address,
}

ActiveAssetsPanel.defaultProps = {
  setCurrent: () => {},
  goToWallets: () => {},
  goToDigitalAssets: () => {},
  digitalAssets: [],
  isLoading: false,
  currentAssetAddress: null,
  currentWalletAddress: null,
}

export default ActiveAssetsPanel
