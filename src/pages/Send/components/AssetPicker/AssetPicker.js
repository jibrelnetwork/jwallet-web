// @flow strict

import React from 'react'
import { t } from 'ttag'

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

type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +digitalAssets: DigitalAssetWithBalance[],
  +fiatCurrency: FiatCurrency,
|}

export function AssetPicker({
  meta,
  input,
  digitalAssets,
  fiatCurrency,
}: Props) {
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

  const activeAssetBalance = activeAsset && activeAsset.balance && activeAsset.balance.value
    ? `${formatAssetBalance(
      activeAsset.blockchainParams.address,
      activeAsset.balance.value,
      activeAsset.blockchainParams.decimals,
    )} ${activeAssetSymbol}`
    : ''

  const activeAssetFiatBalance =
      activeAsset && activeAsset.balance && activeAsset.balance.fiatBalance
        ? `${formatCurrencyWithSymbol(activeAsset.balance.fiatBalance, fiatCurrency)}`
        : ''

  return (
    <JPickerBody
      isOpen={meta.active || false}
      // eslint-disable-next-line react/jsx-handler-names
      onOpen={input.onFocus}
      // eslint-disable-next-line react/jsx-handler-names
      onClose={input.onBlur}
      currentRenderer={() => (
        <JPickerCurrent
          isEditable={false}
          label={t`Asset`}
          value={activeAssetName}
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
      {!digitalAssets.length
        ? (
          <NotFoundItem />
        )
        : (
          <JPickerList
          // eslint-disable-next-line react/jsx-handler-names
            onItemClick={input.onChange}
            activeItemKey={activeAssetAddress}
          >
            {digitalAssets.map((item: DigitalAssetWithBalance) => {
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
                ? `${formatCurrencyWithSymbol(balance.fiatBalance, fiatCurrency)}`
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

AssetPicker.defaultProps = {
  fiatCurrency: 'USD',
}
