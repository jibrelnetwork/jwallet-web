// @flow

import React from 'react'
import { connect } from 'react-redux'
import { type AppState } from 'redux/modules'

import { PageNotFoundError } from 'errors'
import { getAddressLink } from 'utils/transactions'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { selectDigitalAsset } from 'store/selectors/digitalAssets'
import { useI18n } from 'app/hooks'
import {
  TitleHeader,
  FieldPreview,
} from 'components'

import styles from './assetDetails.m.scss'

type Props = {|
  name: string,
  symbol: string,
  decimals: number,
  address: string,
  blockExplorerUISubdomain: string,
  /* :: assetId: string */
|}

type OwnProps = {|
  assetId: string,
|}

export function AssetDetailsView({
  name,
  symbol,
  decimals,
  address,
  blockExplorerUISubdomain,
}: Props) {
  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <TitleHeader
        title={i18n._(
          'AssetDetails.title',
          null,
          { defaults: 'Asset Details' },
        )}
      />
      <div className={styles.center}>
        <FieldPreview
          value={address}
          valueToShow={address}
          link={address && getAddressLink(address, blockExplorerUISubdomain)}
          label={i18n._(
            'AssetDetails.address.title',
            null,
            { defaults: 'Asset address' },
          )}
          isCopyable
        />
        <FieldPreview
          value={name}
          valueToShow={name}
          label={i18n._(
            'AssetDetails.name.title',
            null,
            { defaults: 'Name' },
          )}
        />
        <FieldPreview
          value={symbol}
          valueToShow={symbol}
          label={i18n._(
            'AssetDetails.name.symbol',
            null,
            { defaults: 'Symbol' },
          )}
        />
        <FieldPreview
          value={decimals}
          valueToShow={decimals}
          label={i18n._(
            'AssetDetails.name.decimals',
            null,
            { defaults: 'Decimals' },
          )}
        />
      </div>
    </div>
  )
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const { assetId } = ownProps
  const { blockExplorerUISubdomain } = selectCurrentNetworkOrThrow(state)
  const asset = selectDigitalAsset(state, assetId)

  if (!asset) {
    throw new PageNotFoundError()
  }

  const {
    name,
    symbol,
    blockchainParams: {
      address,
      decimals,
    },
  } = asset

  return {
    name,
    address,
    symbol,
    decimals,
    blockExplorerUISubdomain,
  }
}

export const AssetDetails = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(AssetDetailsView)
