// @flow strict

import React, { Component } from 'react'
import { constants } from 'router5'
import { connect } from 'react-redux'

import { routes } from 'store/router/routes'
import { ErrorUnexpected } from 'pages/ErrorUnexpected/ErrorUnexpected'
import { CONDITIONS_LIST } from 'data/agreements'
import { checkAgreements } from 'utils/agreements'
import { PageNotFoundError } from 'errors'
import {
  selectIntroductionValue,
  selectAgreementsConditions,
  selectIsAgreementsConfirmed,
} from 'store/selectors/user'

import { selectWalletsItems } from 'store/selectors/wallets'
import { selectIsPasswordExists } from 'store/selectors/password'

import {
  MenuLayout,
  WalletsLayout,
} from 'layouts'

import * as pages from 'pages'

import 'styles/core.scss'

type ApplicationError = 'PageNotFoundError' |
  'UnexpectedError'

type Props = {|
  +route: Object,
  +hasPassword: boolean,
  +isAllAgreementsChecked: boolean,
  +isAllFeaturesIntroduced: boolean,
  +showNewWalletProcess: boolean,
|}

type ComponentState = {|
  +error: ?ApplicationError,
  +prevRouteName: ?string,
|}

function checkHasMenu(name): boolean {
  const foundRoute = routes.find(route => (route.name === name))

  return !!foundRoute && foundRoute.hasMenu
}

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
      error: null,
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
        error: null,
      }
    }

    return {}
  }

  static getDerivedStateFromError(err: Error) {
    // FIXME: add error reporting to remote
    /* eslint-disable no-console */
    console.error('Unhandled error')
    console.error(err)
    /* eslint-enable no-console */

    const error = err instanceof PageNotFoundError
      ? 'PageNotFoundError'
      : 'UnexpectedError'

    return {
      error,
    }
  }

  render() {
    switch (this.state.error) {
      case 'PageNotFoundError':
        return renderWithWalletsLayout(pages.NotFound)

      case 'UnexpectedError':
        return <ErrorUnexpected />

      default:
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

    if (checkHasMenu(name)) {
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
  const agreements = selectAgreementsConditions(state)
  const isAgreementsConfirmed = selectIsAgreementsConfirmed(state)
  const isAllAgreementsChecked = checkAgreements(CONDITIONS_LIST, agreements)
    && isAgreementsConfirmed
  const isAllFeaturesIntroduced = selectIntroductionValue(state)

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
