export default () => ({
  path: 'auth',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Auth = require('./containers/AuthContainer').default
      cb(null, Auth)
    }, 'auth')
  },
})
