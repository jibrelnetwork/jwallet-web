// @flow

import React from 'react'

import DigitalAssets from 'components/DigitalAssets'

const DigitalAssetsList = ({ type }: Props) => (
  <div className='digital-assets-list'>
    <DigitalAssets type={type} color='white' />
  </div>
)

type Props = {
  type: 'balance' | 'popular' | 'custom',
}

export default DigitalAssetsList
