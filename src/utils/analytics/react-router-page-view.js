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

export const reactRouterOnEnterPageView = (
  nextState: ReactRouterState
) =>
  ga(
    'send',
    'pageview',
    fullPathWithMaskedVariables(nextState)
  )

export const reactRouterOnChangePageView = (
  prevState: ReactRouterState,
  nextState: ReactRouterState
) =>
  ga(
    'send',
    'pageview',
    fullPathWithMaskedVariables(nextState)
  )
