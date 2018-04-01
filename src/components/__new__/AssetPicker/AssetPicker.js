/* @flow */

import React from 'react'

import JSelect from 'components/base/__new__'

const AssetPicker = ({
  items,
  onAssetSelect,
  selectedAssetId,
}: Props) => (
  <div className='AssetPicker'>
    <JSelect
      title='asset'
      content={{ type: 'token', items }}
      onItemSelect={onAssetSelect}
      selectedItemId={selectedAssetId}
    />
  </div>
)

type Props = {
  items: Array<{
    id: string | number,
    icon: string,
    title: string,
    description: string,
  }>,
  onAssetSelect: (itemId: number) => void,
  selectedAssetId: string | number,
}

export default AssetPicker
