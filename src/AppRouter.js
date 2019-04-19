// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { constants } from 'router5'

import {
  CoreLayout,
  WalletsLayout,
} from 'layouts'

import { MenuLayout } from 'layouts/MenuLayout'
import { CONDITIONS_LIST } from 'data/agreements'
import { checkAgreements } from 'utils/agreements'
import { selectWalletsItems } from 'store/selectors/wallets'
import * as pages from 'pages'

import 'styles/core.scss'
import { ErrorUnexpected } from 'pages/ErrorUnexpected/ErrorUnexpected'

type Props = {
  route: Object,
  isAllAgreementsChecked: boolean,
  hasNoWallets: boolean,
}

type ComponentState = {|
  +hasError: boolean,
  +prevRouteName: ?string,
|}

// FIXME: discuss with the team and update accordingly
const renderWithWalletsLayout = (C, props = {}) => (
  <CoreLayout>
    <WalletsLayout>
      <C {...props} />
    </WalletsLayout>
  </CoreLayout>
)

function getPage(name: string): ?ComponentType {
  return pages[name] || null
}

export class AppRouter extends Component<Props, ComponentState> {
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
      return (<ErrorUnexpected />)
    }

    const {
      route,
      isAllAgreementsChecked,
      hasNoWallets,
    } = this.props

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
      name, params,
    } = route

    const Page = getPage(name)

    if (!Page) {
      return renderWithWalletsLayout(pages.NotFound)
    }

    return (
      <MenuLayout routeName={name}>
        <Page {...params} />
      </MenuLayout>
    )
  }
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
