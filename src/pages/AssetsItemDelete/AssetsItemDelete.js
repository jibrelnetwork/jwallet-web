// @flow strict

import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { toastsPlugin } from 'store/plugins'
import { gaSendEvent } from 'utils/analytics'
import { deleteCustomAsset } from 'store/modules/digitalAssets'
import { selectDigitalAsset } from 'store/selectors/digitalAssets'

import {
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

import styles from './assetsItemDelete.m.scss'

type OwnProps = {|
  +assetId: string,
|}

type Props = {|
  ...OwnProps,
  +goHome: void => any,
  +handleRemove: (Address) => any,
  +i18n: I18n,
  +name: string,
  +symbol: string,
  +isFound: boolean,
|}

class AssetsItemDelete extends Component<Props> {
  static defaultProps = {
    isFound: false,
  }

  componentWillMount() {
    const {
      goHome,
      isFound,
    }: Props = this.props

    if (!isFound) {
      goHome()
    }
  }

  handleRemove = () => {
    const {
      goHome,
      handleRemove,
      i18n,
      assetId,
    }: Props = this.props

    handleRemove(assetId)
    goHome()

    toastsPlugin.showToast(i18n._(
      'AssetsItemDelete.toast',
      null,
      { defaults: 'Asset removed' },
    ))

    gaSendEvent(
      'AssetManager',
      'AssetDeleted',
    )

    return null
  }

  render() {
    const {
      i18n,
      name,
      symbol,
      goHome: handleBack,
    }: Props = this.props

    return (
      <div className={styles.core}>
        <UserActionInfo
          title={i18n._(
            'AssetsItemDelete.title',
            null,
            { defaults: 'Delete Asset?' },
          )}
          text={i18n._(
            'AssetsItemDelete.description',
            {
              name,
              symbol,
            },
            {
              // eslint-disable-next-line max-len
              defaults: 'Jwallet will stop tracking and managing asset {name} ({symbol}). You can add this asset back later.',
            },
          )}
          iconClassName={styles.icon}
          iconName='ic_delete_48-use-fill'
        />
        <div className={styles.buttons}>
          <ButtonWithConfirm
            onCancel={handleBack}
            onConfirm={this.handleRemove}
            labelConfirm={i18n._(
              'AssetsItemDelete.action.submit',
              null,
              { defaults: 'Delete' },
            )}
            labelCancel={i18n._(
              'AssetsItemDelete.action.cancel',
              null,
              { defaults: 'Keep Asset' },
            )}
            isReversed
          />
        </div>
      </div>
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
    return {
      name: '',
      symbol: '',
      isFound: false,
    }
  }

  const {
    name,
    symbol,
  }: DigitalAsset = asset

  return {
    name,
    symbol,
    isFound: true,
  }
}

const mapDispatchToProps = {
  handleRemove: deleteCustomAsset,
  goHome: () => actions.navigateTo('Home'),
}

const AssetsItemDeleteEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AssetsItemDelete)

export { AssetsItemDeleteEnhanced as AssetsItemDelete }
