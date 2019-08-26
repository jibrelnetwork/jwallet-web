// @flow strict

import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import buttonStyles from 'components/base/Button/button.m.scss'
import { PageNotFoundError } from 'errors'
import { formatAssetBalance } from 'utils/formatters'
import { selectDigitalAsset } from 'store/selectors/digitalAssets'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'

import {
  JIcon,
  JLink,
  Header,
  JAssetSymbol,
} from 'components/base'

import styles from './about.m.scss'
import { Links } from './components/Links/Links'
import { Description } from './components/Description/Description'

type OwnProps = {|
  +assetId: string,
|}

type Props = {|
  ...OwnProps,
  +i18n: I18nType,
  +data: DigitalAsset,
  +assetBalance: ?string,
|}

function About({
  i18n,
  data,
  assetId,
  assetBalance,
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
      <Header
        title={i18n._(
          'AssetsItem.About.title',
          null,
          { defaults: 'About' },
        )}
      >
        <JLink
          href={`/assets/${assetId}/details`}
          theme='button-additional-icon'
        >
          <JIcon
            name='ic_info_24-use-fill'
            className={buttonStyles.icon}
          />
          <span className={buttonStyles.label}>
            {i18n._('AssetsItem.About.link.details', null, { defaults: 'Details' })}
          </span>
        </JLink>
      </Header>
      <div className={styles.card}>
        <JAssetSymbol
          symbol={symbol}
          className={styles.symbol}
          address={address}
          color='blue'
          size={32}
        />
        <div className={styles.info}>
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