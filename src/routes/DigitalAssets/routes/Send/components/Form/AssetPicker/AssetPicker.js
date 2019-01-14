// @flow

import React, { Component } from 'react'

import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'
import JPicker, { JPickerItem } from 'components/base/JPicker'

import DigitalAssetsSendFormAssetPickerItem from './Item'
import DigitalAssetsSendFormAssetPickerCurrent from './Current'

type Props = {|
  +onSelect: (assetAddress: AssetAddress) => void,
  +digitalAssets: DigitalAssetWithBalance[],
  +errorMessage: string,
  +selectedAsset: AssetAddress,
|}

type ComponentState = {|
  +searchQuery: string,
|}

function searchDigitalAssets(
  digitalAssets: DigitalAssetWithBalance[],
  searchQuery: string,
): DigitalAssetWithBalance[] {
  const query: string = searchQuery.trim()
  const searchRe: RegExp = new RegExp(query, 'ig')

  return !query ? digitalAssets : digitalAssets.reduce((
    result: DigitalAssetWithBalance[],
    asset: DigitalAssetWithBalance,
  ): DigitalAssetWithBalance[] => {
    const {
      name,
      symbol,
      blockchainParams: {
        address,
      },
    }: DigitalAssetWithBalance = asset

    const isFound: boolean = (
      (name.search(searchRe) !== -1) ||
      (symbol.search(searchRe) !== -1) ||
      (address.search(searchRe) !== -1)
    )

    return !isFound ? result : [
      ...result,
      asset,
    ]
  }, [])
}

class DigitalAssetsSendFormAssetPicker extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      searchQuery: '',
    }
  }

  setSearchQuery = (searchQuery: string) => this.setState({ searchQuery })

  cleanSearchQuery = () => this.setState({ searchQuery: '' })

  render() {
    const {
      onSelect,
      errorMessage,
      digitalAssets,
      selectedAsset,
    }: Props = this.props

    const { searchQuery }: ComponentState = this.state

    const activeAsset: ?DigitalAssetWithBalance =
      getDigitalAssetByAddress/* :: <DigitalAssetWithBalance> */(digitalAssets, selectedAsset)

    const filteredDigitalAssets: DigitalAssetWithBalance[] = searchDigitalAssets(
      digitalAssets,
      searchQuery,
    )

    return (
      <div className='digital-assets-send-form-asset-picker'>
        <JPicker
          onOpen={this.cleanSearchQuery}
          currentRenderer={({ isOpen }) => (
            <DigitalAssetsSendFormAssetPickerCurrent
              onChange={this.setSearchQuery}
              searchQuery={searchQuery}
              currentAsset={activeAsset}
              isOpen={isOpen}
            />
          )}
          errorMessage={errorMessage}
        >
          {filteredDigitalAssets.map((item: DigitalAssetWithBalance) => {
            const assetAddress: AssetAddress = item.blockchainParams.address

            const isSelected: boolean = !!activeAsset && (
              assetAddress === activeAsset.blockchainParams.address
            )

            return (
              <JPickerItem
                key={assetAddress}
                onSelect={onSelect}
                value={assetAddress}
              >
                <DigitalAssetsSendFormAssetPickerItem
                  data={item}
                  isSelected={isSelected}
                />
              </JPickerItem>
            )
          })}
        </JPicker>
      </div>
    )
  }
}

export default DigitalAssetsSendFormAssetPicker
