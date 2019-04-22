// @flow strict

import React, {
  Component,
} from 'react'
import { t } from 'ttag'

import escapeRegExp from 'utils/regexp/escapeRegExp'
import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'
// import {
//   divDecimals,
//   formatBalance,
// } from 'utils/numbers'
import {
  DefaultItem,
  JPickerBody,
  JPickerList,
  JPickerCurrent,
} from 'components/base/JPicker'

import { JAssetSymbol } from 'components/base'

function searchDigitalAssets(
  digitalAssets: DigitalAssetWithBalance[],
  searchQuery: string,
): DigitalAssetWithBalance[] {
  const query: string = searchQuery.trim()
  const searchRe: RegExp = new RegExp(escapeRegExp(query), 'ig')

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

type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +digitalAssets: DigitalAssetWithBalance[],
|}

type ComponentSatte = {|
  searchQuery: string,
|}

class AssetPicker extends Component<Props, ComponentSatte> {
  state = {
    searchQuery: '',
  }

  handleSearchQueryChange = (searchQuery: string) => {
    this.setState({ searchQuery })
  }

  handleOpen = () => {
    this.setState({ searchQuery: '' })
    this.props.input.onFocus()
  }

  handleClose = () => {
    this.setState({ searchQuery: '' })
    this.props.input.onBlur()
  }

  render() {
    const {
      meta,
      input,
      digitalAssets,
    } = this.props

    const {
      searchQuery,
    } = this.state

    const activeAsset: ?DigitalAssetWithBalance =
      getDigitalAssetByAddress(digitalAssets, input.value)

    const activeAssetAddress = activeAsset
      ? activeAsset.blockchainParams.address
      : ''

    const filteredDigitalAssets: DigitalAssetWithBalance[] = searchDigitalAssets(
      digitalAssets,
      searchQuery,
    )

    return (
      <JPickerBody
        isOpen={meta.active || false}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        currentRenderer={({ isOpen }) => (
          <JPickerCurrent
            isEditable={isOpen}
            label={t`Digital asset`}
            value={activeAssetAddress}
            inputValue={searchQuery}
            onInputChange={this.handleSearchQueryChange}
          />
        )}
      >
        <JPickerList
          // eslint-disable-next-line react/jsx-handler-names
          onItemClick={input.onChange}
          activeItemKey={activeAssetAddress}
        >
          {filteredDigitalAssets.map((item: DigitalAssetWithBalance) => {
            const {
              name,
              symbol,
              // balance,
              blockchainParams: {
                address,
                // decimals,
              },
            } = item

            // const balanceStr: string = (balance && balance.value)
            //   ? `${formatBalance(divDecimals(balance.value, decimals), 6)} ${symbol}`
            //   : ''

            return (
              <DefaultItem
                key={address}
                title={name}
                description={symbol}
                iconRenderer={() => <JAssetSymbol symbol={symbol} color='blue' />}
              />
            )
          })}
        </JPickerList>
      </JPickerBody>
    )
  }
}

export { AssetPicker }
