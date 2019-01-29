// @flow

export const root = (state: AppState, pathname: string): string => {
  if (
    !/^\/digital-assets\/?$/.test(pathname) &&
    !/^\/$/.test(pathname)
  ) {
    // skip for all except selected paths
    return pathname
  }

  return '/digital-assets/grid'
}
