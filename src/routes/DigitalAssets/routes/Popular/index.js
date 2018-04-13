export default () => ({
  path: 'popular',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/DigitalAssetsPopularViewContainer').default
      cb(null, View)
    }, 'digital-assets-popular')
  },
})
