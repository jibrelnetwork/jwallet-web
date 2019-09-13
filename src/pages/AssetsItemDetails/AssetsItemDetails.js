// @flow strict

import React from 'react'
import { connect } from 'react-redux'

import { PageNotFoundError } from 'errors'
import { getAddressLink } from 'utils/transactions'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { selectDigitalAsset } from 'store/selectors/digitalAssets'
import { useI18n } from 'app/hooks'

import {
  TitleHeader,
  FieldPreview,
} from 'components'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from './assetsItemDetails.m.scss'

type OwnProps = {|
  +assetId: string,
|}

type Props = {|
  +name: string,
  +symbol: string,
  +address: string,
  +blockExplorerUISubdomain: string,
  +decimals: number,
  +isCustom?: boolean,
  +hasDefaultFields?: boolean,
  /* :: +assetId: string */
|}

function AssetsItemDetails({
  name,
  symbol,
  address,
  decimals,
  isCustom,
  hasDefaultFields,
  blockExplorerUISubdomain,
}: Props) {
  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <TitleHeader
        title={i18n._(
          'AssetsItemDetails.title',
          null,
          { defaults: 'Asset Details' },
        )}
      />
      <div className={styles.card}>
        {isCustom && (
          <div className={styles.header}>
            {!hasDefaultFields && (
              <JLink
                className={styles.action}
                href={`/assets/${address}/edit`}
              >
                <JIcon name='ic_edit_24-use-fill' />
              </JLink>
            )}
            <JLink
              className={styles.action}
              href={`/assets/${address}/delete`}
            >
              <JIcon name='ic_delete_24-use-fill' />
            </JLink>
          </div>
        )}
        <FieldPreview
          value={address}
          link={address && getAddressLink(address, blockExplorerUISubdomain)}
          label={i18n._(
            'AssetsItemDetails.address.title',
            null,
            { defaults: 'Asset address' },
          )}
          isCopyable
        />
        <FieldPreview
          value={name}
          label={i18n._(
            'AssetsItemDetails.name.title',
            null,
            { defaults: 'Name' },
          )}
        />
        <FieldPreview
          value={symbol}
          label={i18n._(
            'AssetsItemDetails.name.symbol',
            null,
            { defaults: 'Symbol' },
          )}
        />
        <FieldPreview
          value={decimals}
          label={i18n._(
            'AssetsItemDetails.name.decimals',
            null,
            { defaults: 'Decimals' },
          )}
        />
      </div>
    </div>
  )
}

AssetsItemDetails.defaultProps = {
  isCustom: false,
  hasDefaultFields: false,
}

function mapStateToProps(
  state: AppState,
  ownProps: OwnProps,
) {
  const { assetId }: OwnProps = ownProps
  const { blockExplorerUISubdomain }: Network = selectCurrentNetworkOrThrow(state)
  const asset: ?DigitalAsset = selectDigitalAsset(state, assetId)

  if (!asset) {
    throw new PageNotFoundError()
  }

  const {
    name,
    symbol,
    isCustom,
    hasDefaultFields,
    blockchainParams: {
      address,
      decimals,
    },
  } = asset

  return {
    name,
    symbol,
    address,
    decimals,
    isCustom,
    hasDefaultFields,
    blockExplorerUISubdomain,
  }
}

const AssetsItemDetailsEnhanced = connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(
  AssetsItemDetails,
)

export { AssetsItemDetailsEnhanced as AssetsItemDetails }
