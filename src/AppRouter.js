// @flow strict

import React, { Component } from 'react'
import { constants } from 'router5'
import { connect } from 'react-redux'

import { MenuLayout } from 'layouts'
import { PageNotFoundError } from 'errors'
import { routes } from 'store/router/routes'
import { CONDITIONS_LIST } from 'data/agreements'
import { checkAgreements } from 'utils/agreements'
import { checkMigrationV1Needed } from 'store/migrations/v1'
import { selectWalletsItems } from 'store/selectors/wallets'
import { selectIsPasswordExists } from 'store/selectors/password'

import {
  selectIntroductionValue,
  selectAgreementsConditions,
  selectIsAgreementsConfirmed,
} from 'store/selectors/user'

import * as pages from 'pages'

import 'styles/core.scss'

type ApplicationError = 'PageNotFoundError' | 'UnexpectedError'

type Props = {|
  +route: Object,
  +hasPassword: boolean,
  +showNewWalletProcess: boolean,
  +isAllAgreementsChecked: boolean,
  +isAllFeaturesIntroduced: boolean,
|}

type StateProps = {|
  +error: ?ApplicationError,
  +prevRouteName: ?string,
  +isMigrationNeeded: ?boolean,
|}

function checkHasMenu(name): boolean {
  const foundRoute = routes.find(route => (route.name === name))

  return !!foundRoute && foundRoute.hasMenu
}

function renderWithMenuLayout(
  params: Object = {},
  routeName: string,
) {
  const Page = pages[routeName]

  return (
    <MenuLayout routeName={routeName}>
      <Page {...params} />
    </MenuLayout>
  )
}

class AppRouter extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      error: null,
      // is used in state from props derivation logic
      // eslint-disable-next-line react/no-unused-state
      prevRouteName: null,
      isMigrationNeeded: null,
    }
  }

  static getDerivedStateFromProps({ route }: Props, state: StateProps) {
    const nextRouteName = (!route && !route.name) ? constants.UNKNOWN_ROUTE : route.name

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

  async componentDidMount() {
    this.setState({
      isMigrationNeeded: await checkMigrationV1Needed(),
    })
  }

  render() {
    const {
      error,
      isMigrationNeeded,
    }: StateProps = this.state

    switch (error) {
      case 'PageNotFoundError':
        return <pages.NotFound />

      case 'UnexpectedError':
        return <pages.ErrorUnexpected />

      default:
    }

    const {
      route,
      hasPassword,
      showNewWalletProcess,
      isAllAgreementsChecked,
      isAllFeaturesIntroduced,
    }: Props = this.props

    const {
      name,
      params,
    } = route

    if (!route || (name === constants.UNKNOWN_ROUTE)) {
      return <pages.NotFound />
    }

    if (!isAllFeaturesIntroduced) {
      return <pages.Introduction />
    }

    if (!isAllAgreementsChecked) {
      return <pages.AgreementsView />
    }

    if (isMigrationNeeded == null) {
      return null
    }

    if (isMigrationNeeded) {
      return <pages.WalletsMigration />
    }

    if (!hasPassword) {
      return <pages.SetPassword />
    }

    if (showNewWalletProcess) {
      return <pages.WalletsStart />
    }

    if (checkHasMenu(name)) {
      return renderWithMenuLayout(params, name)
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
  const isAgreementsConfirmed: boolean = selectIsAgreementsConfirmed(state)
  const isAllAgreementsChecked: boolean = checkAgreements(CONDITIONS_LIST, agreements)
    && isAgreementsConfirmed
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

const AppRouterEnhanced = connect<Props, OwnPropsEmpty, _, _, _, _>(mapStateToProps)(AppRouter)
export { AppRouterEnhanced as AppRouter }
