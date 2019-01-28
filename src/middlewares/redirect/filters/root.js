export const root = (state, pathname) => {
  if (
    !/^\/digital-assets\/?$/.test(pathname) &&
    !/^\/$/.test(pathname)
  ) {
    // skip for all except selected paths
    return pathname
  }

  return '/digital-assets/grid'
}
