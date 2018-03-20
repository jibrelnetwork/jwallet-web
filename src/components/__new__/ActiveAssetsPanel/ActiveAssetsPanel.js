// @flow

import React from 'react'
import { Link } from 'react-router'

import { JIcon, JText } from 'components/base/__new__'
import { ActiveAsset, CurrentAddress } from 'components/__new__'

const ActiveAssetsPanel = ({
  setCurrent,
  digitalAssets,
  currentAssetAddress,
  currentWalletAddress,
}: Props) => (
  <div className='active-assets-panel'>
    <CurrentAddress address={currentWalletAddress} />
    <div className='list'>
      {digitalAssets.map((data, index) => (
        <ActiveAsset
          {...data}
          key={index}
          setCurrent={setCurrent}
          isCurrent={currentAssetAddress === data.address}
        />
      ))}
    </div>
    <div className='manage'>
      <Link to='/digital-assets' className='link'>
        <JIcon size='small' name='plus' />
        <JText value='assetsPanel.button' />
      </Link>
    </div>
  </div>
)

type Props = {
  setCurrent: Function,
  digitalAssets: DigitalAssets,
  currentAssetAddress: ?Address,
  currentWalletAddress: ?Address,
}

export default ActiveAssetsPanel
