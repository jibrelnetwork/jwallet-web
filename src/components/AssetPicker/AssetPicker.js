// @flow

import React, { Component } from 'react'

import JPicker, { JPickerItem } from 'components/base/JPicker'

import AssetPickerCurrent from './Current/AssetPickerCurrent'
import AssetPickerItem from './Item/AssetPickerItem'

type Props = {|
  assets: Array<DigitalAssetWithBalance>,
  selectedAsset: Address,
  onSelect: (address: Address) => void,
|}

type ComponentState = {|
  filter: string,
|}

class AssetPicker extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      filter: '',
    }
  }

  onFilterChange = (filter: string) => {
    this.setState({ filter })
  }

  onOpen = () => {
    // reset filter
    this.setState({ filter: '' })
  }

  render() {
    const {
      assets,
      selectedAsset,
      onSelect,
    } = this.props

    const {
      filter,
    } = this.state

    const activeAsset = assets.find(asset => asset.address === selectedAsset)

    const filterStr = filter.trim().toLowerCase()
    const filteredAssets = filterStr
      ? assets.filter(asset =>
        asset.address.toLowerCase() === filterStr ||
          asset.symbol.toLowerCase().indexOf(filterStr) !== -1 ||
          asset.name.toLowerCase().indexOf(filterStr) !== -1
      )
      : assets

    return (
      <div className='asset-picker'>
        <JPicker
          onOpen={this.onOpen}
          currentRenderer={({ isOpen }) => (
            <AssetPickerCurrent
              isOpen={isOpen}
              filterChange={this.onFilterChange}
              filterValue={filter}
              asset={activeAsset}
            />)}
        >
          {filteredAssets.map(asset => (
            <JPickerItem
              key={asset.address}
              onSelect={onSelect}
              value={asset.address}
            >
              <AssetPickerItem
                asset={asset}
                isSelected={activeAsset && asset.address === activeAsset.address}
              />
            </JPickerItem>
          ))}
        </JPicker>
      </div>
    )
  }
}

export default AssetPicker
