// @flow strict

import React from 'react'
import classNames from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import buttonStyles from 'components/base/Button/button.m.scss'
import { TitleHeader } from 'components'
import { PageNotFoundError } from 'errors'
import { formatAssetBalance } from 'utils/formatters'
import { selectDigitalAsset } from 'store/selectors/digitalAssets'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'

import {
  JIcon,
  JLink,
  JAssetSymbol,
} from 'components/base'

import styles from './about.m.scss'
import { Links } from './components/Links/Links'
import { Description } from './components/Description/Description'

type OwnProps = {|
  +assetId: string,
  +isHeaderScrolled: ?boolean,
|}

type Props = {|
  ...OwnProps,
  +i18n: I18n,
  +data: DigitalAsset,
  +assetBalance: ?string,
|}

function About({
  i18n,
  data,
  assetId,
  assetBalance,
  isHeaderScrolled,
}: Props) {
  const {
    name,
    symbol,
    assetPage,
    blockchainParams,
  }: DigitalAsset = data

  if (!blockchainParams) {
    return null
  }

  const {
    address,
    decimals,
  }: DigitalAssetBlockchainParams = blockchainParams

  return (
    <div className={styles.core}>
      <TitleHeader
        title={i18n._(
          'AssetsItemDetails.title',
          null,
          { defaults: 'Asset Details' },
        )}
        isScrolled={isHeaderScrolled}
      >
        <JLink
          href={`/assets/${assetId}/details`}
          theme='button-additional-icon'
        >
          <JIcon
            name='ic_info_24_round-use-fill'
            className={buttonStyles.icon}
          />
          <span className={buttonStyles.label}>
            {i18n._('AssetsItem.About.link.details', null, { defaults: 'Details' })}
          </span>
        </JLink>
      </TitleHeader>
      <div className={styles.card}>
        <JAssetSymbol
          symbol={symbol}
          className={styles.symbol}
          address={address}
          color='blue'
          size={32}
        />
        <div className={classNames(styles.info, assetPage && styles.delimiter)}>
          <div className={styles.name}>{name}</div>
          <div className={styles.balance}>
            {formatAssetBalance(
              address,
              assetBalance || '0',
              decimals,
              symbol,
            )}
          </div>
          <Links assetPage={assetPage} />
        </div>
        <Description assetPage={assetPage} />
      </div>
    </div>
  )
}

function mapStateToProps(state: AppState, { assetId }: OwnProps) {
  const item: ?DigitalAsset = selectDigitalAsset(state, assetId)

  if (!item) {
    throw new PageNotFoundError()
  }

  const assetBalance: ?Balance = selectBalanceByAssetAddress(state, assetId)

  return {
    data: item,
    assetBalance: assetBalance && !assetBalance.isError && assetBalance.value,
  }
}

const AboutEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(mapStateToProps),
)(About)

export { AboutEnhanced as About }
