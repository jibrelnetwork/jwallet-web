// @flow

import React from 'react'
import { connect } from 'react-redux'
import { constants } from 'router5'

import {
  CoreLayout,
  WalletsLayout,
} from 'layouts'

import 'styles/core.scss'
import {
  MenuLayout,
} from 'layouts/MenuLayout/MenuLayout'

import { selectWalletsItems } from 'store/selectors/wallets'

import { checkAgreements } from 'utils/agreements'
import { CONDITIONS_LIST } from 'data/agreements'

import * as pages from 'pages'

type Props = {
  route: Object,
  isAllAgreementsChecked: boolean,
  hasNoWallets: boolean,
}

// FIXME: discuss with the team and update accordingly
const renderWithWalletsLayout = (Component, props = {}) => (
  <CoreLayout>
    <WalletsLayout>
      <Component {...props} />
    </WalletsLayout>
  </CoreLayout>
)

function getPage(name: string): ?ComponentType {
  return pages[name] || null
}

export const AppRouter = ({
  route,
  isAllAgreementsChecked,
  hasNoWallets,
}: Props) => {
  if (!route || route.name === constants.UNKNOWN_ROUTE) {
    return renderWithWalletsLayout(pages.NotFound)
  }

  if (!isAllAgreementsChecked) {
    return renderWithWalletsLayout(pages.Agreements)
  }

  if (hasNoWallets) {
    return null
  }

  const {
    name,
    params,
  } = route
  const Component = getPage(name)

  if (!Component) {
    return renderWithWalletsLayout(pages.NotFound)
  }

  return (
    <MenuLayout routeName={name}>
      <Component {...params} />
    </MenuLayout>
  )
}

export default connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  (state) => {
    const isAllAgreementsChecked = checkAgreements(CONDITIONS_LIST)
    const hasNoWallets = selectWalletsItems(state).length === 0

    return {
      route: state.router.route,
      isAllAgreementsChecked,
      hasNoWallets,
    }
  },
)(AppRouter)
