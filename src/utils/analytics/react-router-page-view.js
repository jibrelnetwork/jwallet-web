// @flow

import { gaSendPageView } from './ga'

const fullPathWithMaskedVariables = routerState =>
  routerState.routes
    .reduce(
      (memo, route) =>
        route.path ? `${memo}/${route.path}` : memo,
      '',
    )
    .replace(/\/{2,}/g, '/')
    .replace(/[(|)]/g, '')

export const reactRouterOnEnterPageView = (exclude: RegExp[] = []) =>
  (nextState: ReactRouterState): void => {
    if (!exclude.find(re => re.test(nextState.location.pathname))) {
      gaSendPageView(
        fullPathWithMaskedVariables(nextState),
      )
    }
  }

export const reactRouterOnChangePageView = (exclude: RegExp[] = []) =>
  (
    prevState: ReactRouterState,
    nextState: ReactRouterState,
  ): void => reactRouterOnEnterPageView(exclude)(nextState)
