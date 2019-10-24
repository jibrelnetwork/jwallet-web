// @flow strict

import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { PageNotFoundError } from 'errors'
import { toastsPlugin } from 'store/plugins'
import { gaSendEvent } from 'utils/analytics'
import { DigitalAssetEditForm } from 'components'
import { selectDigitalAsset } from 'store/selectors/digitalAssets'

import { updateAsset } from 'store/modules/digitalAssets'

type OwnProps = {|
  +assetId: string,
|}

type Props = {|
  ...OwnProps,
  +goHome: void => any,
  +handleSubmit: (
    Address,
    string,
    string,
    number,
  ) => any,
  +i18n: I18n,
  +initialValues: FormFields,
|}

class AssetsItemEdit extends PureComponent<Props> {
  submit = (values: FormFields): ?FormFields => {
    const {
      goHome,
      handleSubmit,
      i18n,
      assetId,
    }: Props = this.props

    const {
      name,
      symbol,
      decimals,
    }: FormFields = values

    const contractName: string = (name || '').trim()
    const contractSymbol: string = (symbol || '').trim()
    const contractDecimals: number = parseInt(decimals, 10)
    const formErrors: FormFields = {}

    if (!contractName) {
      formErrors.name = i18n._(
        'AssetsItemEdit.error.name',
        null,
        { defaults: 'Valid asset name is required' },
      )
    }

    if (!contractSymbol) {
      formErrors.symbol = i18n._(
        'AssetsItemEdit.error.symbol',
        null,
        { defaults: 'Valid asset symbol is required' },
      )
    }

    if (Number.isNaN(contractDecimals) || contractDecimals < 0 || contractDecimals > 127) {
      formErrors.decimals = i18n._(
        'AssetsItemEdit.error.decimals',
        null,
        { defaults: 'Asset decimals should be a number between 0...127' },
      )
    }

    if (Object.keys(formErrors).length) {
      return formErrors
    }

    handleSubmit(
      assetId,
      contractName,
      contractSymbol,
      contractDecimals,
    )

    toastsPlugin.showToast(i18n._(
      'AssetsItemEdit.toast',
      null,
      { defaults: 'Asset updated' },
    ))

    gaSendEvent(
      'AssetManager',
      'AssetUpdated',
    )

    goHome()

    return null
  }

  render() {
    return (
      <DigitalAssetEditForm
        submit={this.submit}
        initialValues={this.props.initialValues}
      />
    )
  }
}

function mapStateToProps(
  state: AppState,
  { assetId }: OwnProps,
) {
  const asset: ?DigitalAsset = selectDigitalAsset(
    state,
    assetId,
  )

  if (!(asset && asset.isCustom)) {
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
    initialValues: {
      name,
      symbol,
      address,
      decimals,
    },
  }
}

const mapDispatchToProps = {
  handleSubmit: updateAsset,
  goHome: () => actions.navigateTo('Home'),
}

const AssetsItemEditEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AssetsItemEdit)

export { AssetsItemEditEnhanced as AssetsItemEdit }
