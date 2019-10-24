// @flow

import { router } from 'store/router'

export function router5BackOrFallbackFunctionCreator(
  previousRoute: ?Router5Route,
  fallbackRouteName: string,
  fallbackRouteParams?: Object,
): () => void {
  return function router5BackOrFallback() {
    if (previousRoute) {
      window.history.back()
    } else {
      router.navigateTo(fallbackRouteName, fallbackRouteParams)
    }
  }
}
