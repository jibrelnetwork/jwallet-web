// @flow

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
import * as pages from 'routes'

import 'styles/core.scss'

type Props = {|
  +route: Object,
  +hasWallets: boolean,
  +isAllAgreementsChecked: boolean,
|}

// FIXME: discuss with the team and update accordingly
function renderWithWalletsLayout(Component, props = {}) {
  return (
    <WalletsLayout>
      <Component {...props} />
    </WalletsLayout>
  )
}

function renderWithMenuLayout(Component, props = {}, routeName) {
  return (
    <MenuLayout routeName={routeName}>
      <Component {...props} />
    </MenuLayout>
  )
}

function AppRouter({
  route,
  hasWallets,
  isAllAgreementsChecked,
}: Props) {
  if (!route || route.name === constants.UNKNOWN_ROUTE) {
    return renderWithWalletsLayout(pages.NotFound)
  }

  if (!isAllAgreementsChecked) {
    return renderWithWalletsLayout(pages.Agreements)
  }

  if (!hasWallets) {
    return null
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
  const hasWallets: boolean = selectWalletsItems(state).length !== 0
  const isAllAgreementsChecked: boolean = checkAgreements(CONDITIONS_LIST)

  return {
    route,
    hasWallets,
    isAllAgreementsChecked,
  }
}

export const AppRouterContainer = connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
)(AppRouter)

export { AppRouterContainer as AppRouter }
