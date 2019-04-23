// @flow strict

import React, {
  Component,
} from 'react'
import { t } from 'ttag'

import escapeRegExp from 'utils/regexp/escapeRegExp'
import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
  NotFoundItem,
} from 'components/base/JPicker'
import {
  formatAssetBalance,
  formatCurrencyWithSymbol,
} from 'utils/formatters'
import { JAssetSymbol } from 'components/base'

import { AssetBalance } from './AssetBalance/AssetBalance'
import { AssetItem } from './Item/AssetItem'

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
  +fiatCurrency: FiatCurrency,
|}

type ComponentSatte = {|
  searchQuery: string,
|}

class AssetPicker extends Component<Props, ComponentSatte> {
  static defaultProps = {
    fiatCurrency: 'USD',
  }

  state = {
    searchQuery: '',
  }

  handleSearchQueryChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value })
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
      fiatCurrency,
    } = this.props

    const {
      searchQuery,
    } = this.state

    const activeAsset: ?DigitalAssetWithBalance =
      getDigitalAssetByAddress(digitalAssets, input.value)

    const activeAssetAddress = activeAsset
      ? activeAsset.blockchainParams.address
      : ''

    const activeAssetSymbol = activeAsset
      ? activeAsset.symbol.toUpperCase()
      : ''

    const activeAssetName = activeAsset
      ? activeAsset.name
      : ''

    const filteredDigitalAssets: DigitalAssetWithBalance[] = searchDigitalAssets(
      digitalAssets,
      searchQuery,
    )

    const activeAssetBalance = activeAsset && activeAsset.balance && activeAsset.balance.value
      ? `${formatAssetBalance(
        activeAsset.blockchainParams.address,
        activeAsset.balance.value,
        activeAsset.blockchainParams.decimals,
      )} ${activeAsset.symbol}`
      : ''

    const activeAssetFiatBalance =
      activeAsset && activeAsset.balance && activeAsset.balance.fiatBalance
        ? `${formatCurrencyWithSymbol(activeAsset.balance.fiatBalance, fiatCurrency)}`
        : ''

    return (
      <JPickerBody
        isOpen={meta.active || false}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        currentRenderer={({ isOpen }) => (
          <JPickerCurrent
            isEditable={isOpen}
            label={t`Digital asset`}
            value={activeAssetName}
            inputValue={searchQuery}
            onInputChange={this.handleSearchQueryChange}
            iconRenderer={() => (
              <JAssetSymbol
                address={activeAssetAddress}
                color='blue'
                symbol={activeAssetSymbol}
                size={24}
              />
            )}
            balancesRenderer={() => (
              <AssetBalance
                assetBalance={activeAssetBalance}
                fiatBalance={activeAssetFiatBalance}
              />
            )}
          />
        )}
      >
        {!filteredDigitalAssets.length
          ? (
            <NotFoundItem />
          )
          : (
            <JPickerList
            // eslint-disable-next-line react/jsx-handler-names
              onItemClick={input.onChange}
              activeItemKey={activeAssetAddress}
            >
              {filteredDigitalAssets.map((item: DigitalAssetWithBalance) => {
                const {
                  name,
                  balance,
                  blockchainParams: {
                    address,
                    decimals,
                  },
                } = item

                const symbol = item.symbol.toUpperCase()

                const formattedAssetBalance = balance && balance.value
                  ? `${formatAssetBalance(address, balance.value, decimals)} ${symbol}`
                  : ''

                const formattedFiatBalance = balance && balance.fiatBalance
                  ? `=${formatCurrencyWithSymbol(balance.fiatBalance, fiatCurrency)}`
                  : ''

                return (
                  <AssetItem
                    key={address}
                    name={name}
                    symbol={symbol}
                    address={address}
                    assetBalance={formattedAssetBalance}
                    fiatBalance={formattedFiatBalance}
                  />
                )
              })}
            </JPickerList>
          )
        }
      </JPickerBody>
    )
  }
}

export { AssetPicker }
