// @flow

import { ga } from './ga'

const fullPathWithMaskedVariables = routerState =>
  routerState.routes
    .reduce(
      (memo, route) =>
        route.path ? `${memo}/${route.path}` : memo,
      ''
    )
    .replace(/\/{2,}/g, '/')
    .replace(/[(|)]/g, '')

export const reactRouterOnEnterPageView = (exclude: Array<RegExp> = []) =>
  (nextState: ReactRouterState): void => {
    if (!exclude.find(re => re.test(nextState.location.pathname))) {
      ga(
        'send',
        'pageview',
        fullPathWithMaskedVariables(nextState)
      )
    }
  }

export const reactRouterOnChangePageView = (exclude: Array<RegExp> = []) =>
  (
    prevState: ReactRouterState,
    nextState: ReactRouterState
  ): void => reactRouterOnEnterPageView(exclude)(nextState)
