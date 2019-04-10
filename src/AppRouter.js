// @flow strict

import React from 'react'
import { constants } from 'router5'
import { connect } from 'react-redux'

import {
  MenuLayout,
  WalletsLayout,
} from 'layouts'

import { CONDITIONS_LIST } from 'data/agreements'
import { checkAgreements } from 'utils/agreements'
import { selectWalletsItems } from 'store/selectors/wallets'
import { selectIsPasswordExists } from 'store/selectors/password'
import * as pages from 'pages'

import 'styles/core.scss'

type Props = {|
  +route: Object,
  +hasWallets: boolean,
  +hasPassword: boolean,
  +isAllAgreementsChecked: boolean,
  +isAllFeaturesIntroduced: boolean,
|}

// FIXME: discuss with the team and update accordingly
function renderWithWalletsLayout(
  Component,
  props = {},
) {
  return (
    <WalletsLayout>
      <Component {...props} />
    </WalletsLayout>
  )
}

function renderWithMenuLayout(
  Component,
  props = {},
  routeName: ?string,
) {
  return (
    <MenuLayout routeName={routeName}>
      <Component {...props} />
    </MenuLayout>
  )
}

function AppRouter({
  route,
  hasWallets,
  hasPassword,
  isAllAgreementsChecked,
  isAllFeaturesIntroduced,
}: Props) {
  if (!route || route.name === constants.UNKNOWN_ROUTE) {
    return renderWithWalletsLayout(pages.NotFound)
  }

  if (!isAllFeaturesIntroduced) {
    return renderWithMenuLayout(pages.NotFound)
  }

  if (!isAllAgreementsChecked) {
    return renderWithWalletsLayout(pages.AgreementsView)
  }

  if (!hasPassword) {
    return renderWithMenuLayout(pages.SetPasswordView)
  }

  if (!hasWallets) {
    return renderWithMenuLayout(pages.WalletsStartView)
  }

  const {
    name,
    params,
  } = route

  const Component = pages[name]

  if (!Component) {
    return renderWithWalletsLayout(pages.NotFound)
  }

  return renderWithMenuLayout(Component, params, name)
}

function mapStateToProps(state) {
  const { route } = state.router
  const wallets: Wallet[] = selectWalletsItems(state)
  const hasWallets: boolean = !!wallets.length
  const hasPassword: boolean = selectIsPasswordExists(state)
  const isAllAgreementsChecked: boolean = checkAgreements(CONDITIONS_LIST)
  const isAllFeaturesIntroduced: boolean = true /* checkFeatures(FEATURES_LIST) */

  return {
    route,
    hasWallets,
    hasPassword,
    isAllAgreementsChecked,
    isAllFeaturesIntroduced,
  }
}

export const AppRouterContainer = connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
)(AppRouter)

export { AppRouterContainer as AppRouter }
