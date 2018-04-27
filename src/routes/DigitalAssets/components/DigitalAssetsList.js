// @flow

import React from 'react'

import DigitalAssets from 'components/DigitalAssets'

const DigitalAssetsList = ({ type }: Props) => (
  <div className='digital-assets-list'>
    <DigitalAssets type={type} />
  </div>
)

type Props = {
  type: 'balance' | 'popular' | 'custom',
}

DigitalAssetsList.defaultProps = {
  type: 'balance',
}

export default DigitalAssetsList
