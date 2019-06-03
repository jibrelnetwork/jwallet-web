// @flow strict

import React, { Component } from 'react'
import { constants } from 'router5'
import { connect } from 'react-redux'

import {
  MenuLayout,
  WalletsLayout,
} from 'layouts'

import { CONDITIONS_LIST } from 'data/agreements'
import { checkAgreements } from 'utils/agreements'
import { selectIntroductionValue } from 'store/selectors/user'
import { selectWalletsItems } from 'store/selectors/wallets'
import { selectIsPasswordExists } from 'store/selectors/password'
import * as pages from 'pages'

import 'styles/core.scss'
import { ErrorUnexpected } from 'pages/ErrorUnexpected/ErrorUnexpected'

type Props = {|
  +route: Object,
  +hasPassword: boolean,
  +isAllAgreementsChecked: boolean,
  +isAllFeaturesIntroduced: boolean,
  +showNewWalletProcess: boolean,
|}

type ComponentState = {|
  +hasError: boolean,
  +prevRouteName: ?string,
|}

// FIXME: discuss with the team and update accordingly
function renderWithWalletsLayout(
  Page,
  props = {},
) {
  return (
    <WalletsLayout>
      <Page {...props} />
    </WalletsLayout>
  )
}

function renderWithMenuLayout(
  Page,
  props = {},
  routeName: string,
) {
  return (
    <MenuLayout routeName={routeName}>
      <Page {...props} />
    </MenuLayout>
  )
}

class AppRouter extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hasError: false,
      // is used in state from props derivation logic
      // eslint-disable-next-line react/no-unused-state
      prevRouteName: null,
    }
  }

  static getDerivedStateFromProps({ route }: Props, state: ComponentState) {
    const nextRouteName = (!route && !route.name) ?
      constants.UNKNOWN_ROUTE :
      route.name

    if (!state.prevRouteName) {
      return {
        prevRouteName: nextRouteName,
      }
    }

    if (state.prevRouteName !== route.name) {
      return {
        prevRouteName: route.name,
        hasError: false,
      }
    }

    return {}
  }

  static getDerivedStateFromError(error: Error) {
    // FIXME: add error reporting to remote
    /* eslint-disable no-console */
    console.error('Unhandled error')
    console.error(error)
    /* eslint-enable no-console */

    return {
      hasError: true,
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUnexpected />
    }

    const {
      route,
      hasPassword,
      isAllAgreementsChecked,
      isAllFeaturesIntroduced,
      showNewWalletProcess,
    } = this.props

    const {
      name,
      params,
      hasMenu,
    } = route

    if (!route || (name === constants.UNKNOWN_ROUTE)) {
      return renderWithWalletsLayout(pages.NotFound)
    }

    if (!isAllFeaturesIntroduced) {
      return <pages.Introduction />
    }

    if (!isAllAgreementsChecked) {
      return <pages.AgreementsView />
    }

    if (!hasPassword) {
      return <pages.SetPassword />
    }

    if (showNewWalletProcess) {
      return <pages.WalletsStart />
    }

    if (hasMenu) {
      return renderWithMenuLayout(pages[name], params, name)
    }

    const Page = pages[name]

    return <Page {...params} />
  }
}

function mapStateToProps(state: AppState) {
  const { route } = state.router
  const wallets: Wallet[] = selectWalletsItems(state)
  const hasWallets: boolean = !!wallets.length
  const hasPassword: boolean = selectIsPasswordExists(state)
  const isAllAgreementsChecked: boolean = checkAgreements(CONDITIONS_LIST)
  const isAllFeaturesIntroduced: boolean = selectIntroductionValue(state)

  return {
    route,
    hasPassword,
    isAllAgreementsChecked,
    isAllFeaturesIntroduced,
    showNewWalletProcess: !hasWallets &&
      (route.name !== 'WalletsCreate') &&
      (route.name !== 'WalletsImport'),
  }
}

const AppRouterContainer = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
  () => ({}),
)(AppRouter)

export { AppRouterContainer as AppRouter }
