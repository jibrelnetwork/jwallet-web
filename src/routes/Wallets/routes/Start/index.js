export default () => ({
  path: 'start',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/WalletsStartViewContainer').default
      cb(null, View)
    }, 'wallets-start')
  },
})
