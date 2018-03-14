// @flow

import React from 'react'
import { Link } from 'react-router'

import ActiveAsset from 'components/__new__/ActiveAsset'
import { JIcon, JText } from 'components/base/__new__'

const ActiveAssetsPanel = ({
  setCurrent,
  digitalAssets,
  currentAddress,
}: Props) => (
  <div className='active-assets-panel'>
    <div className='list'>
      {digitalAssets.map((data, index) => (
        <ActiveAsset
          {...data}
          key={index}
          setCurrent={setCurrent}
          isCurrent={currentAddress === data.address}
        />
      ))}
    </div>
    <div className='manage'>
      <Link to='/digital-assets' className='link'>
        <JIcon size='small' name='plus-blue' />
        <JText value='assetsPanel.button' />
      </Link>
    </div>
  </div>
)

type Props = {
  setCurrent: Function,
  digitalAssets: DigitalAssets,
  currentAddress: Address,
}

export default ActiveAssetsPanel
