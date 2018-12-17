// @flow

import React, { Component } from 'react'

import JPicker, { JPickerItem } from 'components/base/JPicker'

import AssetPickerCurrent from './Current/AssetPickerCurrent'
import AssetPickerItem from './Item/AssetPickerItem'

type Props = {|
  assets: Array<DigitalAsset>,
  selectedAsset: Address,
  onSelect: (address: Address) => void,
  // isDisabled: boolean,
|}

type ComponentState = {|
  filter: string,
|}

class AssetPicker extends Component<Props, ComponentState> {
  static defaultProps = {
    isDisabled: false,
  }

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
          { assets.map(asset => (
            <JPickerItem
              key={asset.address}
              onSelect={onSelect}
              value={asset.address}
            >
              <AssetPickerItem
                asset={asset}
              />
            </JPickerItem>
          )) }
        </JPicker>
      </div>
    )
  }
}

export default AssetPicker
